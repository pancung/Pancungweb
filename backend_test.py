#!/usr/bin/env python3
"""
Backend API tests for Tài Chính An Tâm insurance lead-collection app
Tests all /api endpoints with validation, error cases, and cleanup
"""
import requests
import json
import sys
from typing import List, Dict, Any

# Base URL from frontend/.env
BASE_URL = "https://viet-insurance.preview.emergentagent.com/api"

# Track created lead IDs for cleanup
created_lead_ids: List[str] = []

def print_test(name: str):
    """Print test name"""
    print(f"\n{'='*80}")
    print(f"TEST: {name}")
    print('='*80)

def print_result(passed: bool, message: str):
    """Print test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {message}")
    return passed

def test_root():
    """Test GET /api/"""
    print_test("GET /api/ - Root endpoint")
    try:
        resp = requests.get(f"{BASE_URL}/", timeout=10)
        data = resp.json()
        
        passed = (
            resp.status_code == 200 and
            "message" in data and
            data.get("status") == "ok"
        )
        print_result(passed, f"Status {resp.status_code}, response: {data}")
        return passed
    except Exception as e:
        print_result(False, f"Exception: {e}")
        return False

def test_health():
    """Test GET /api/health"""
    print_test("GET /api/health - Health check")
    try:
        resp = requests.get(f"{BASE_URL}/health", timeout=10)
        data = resp.json()
        
        passed = (
            resp.status_code == 200 and
            data.get("status") == "ok" and
            data.get("db") == "ok"
        )
        print_result(passed, f"Status {resp.status_code}, response: {data}")
        return passed
    except Exception as e:
        print_result(False, f"Exception: {e}")
        return False

def test_create_lead_full():
    """Test POST /api/leads with full payload"""
    print_test("POST /api/leads - Create lead with full data")
    try:
        payload = {
            "source": "contact",
            "name": "Nguyễn Thị Hoa",
            "phone": "+420 777 123 456",
            "email": "hoa@example.com",
            "city": "Praha",
            "interest": "Balíček Rodina",
            "langPref": "Vietnamsky",
            "message": "Test message",
            "lang": "vi",
            "packageId": "family",
            "calc": {
                "age": 32,
                "monthly": 1500,
                "years": 25
            }
        }
        
        resp = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        data = resp.json()
        
        # Verify response
        checks = []
        checks.append(("Status code 201", resp.status_code == 201))
        checks.append(("Has 'id' field", "id" in data))
        checks.append(("Status is 'new'", data.get("status") == "new"))
        checks.append(("Has 'createdAt'", "createdAt" in data))
        checks.append(("Name echoed", data.get("name") == payload["name"]))
        checks.append(("Phone echoed", data.get("phone") == payload["phone"]))
        checks.append(("Email echoed", data.get("email") == payload["email"]))
        checks.append(("City echoed", data.get("city") == payload["city"]))
        checks.append(("Lang echoed", data.get("lang") == payload["lang"]))
        checks.append(("Calc echoed", data.get("calc") == payload["calc"]))
        
        all_passed = all(check[1] for check in checks)
        
        for check_name, check_result in checks:
            print(f"  {'✓' if check_result else '✗'} {check_name}")
        
        if "id" in data:
            created_lead_ids.append(data["id"])
            print(f"  Created lead ID: {data['id']}")
        
        print_result(all_passed, f"Full lead creation {'successful' if all_passed else 'failed'}")
        return all_passed
    except Exception as e:
        print_result(False, f"Exception: {e}")
        return False

def test_create_lead_minimal():
    """Test POST /api/leads with minimal payload (chat source)"""
    print_test("POST /api/leads - Create lead with minimal data (chat)")
    try:
        payload = {
            "source": "chat",
            "name": "Trần Văn Nam",
            "phone": "+420888999000",
            "lang": "cs"
        }
        
        resp = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        data = resp.json()
        
        checks = []
        checks.append(("Status code 201", resp.status_code == 201))
        checks.append(("Has 'id' field", "id" in data))
        checks.append(("Status is 'new'", data.get("status") == "new"))
        checks.append(("Source is 'chat'", data.get("source") == "chat"))
        checks.append(("Name echoed", data.get("name") == payload["name"]))
        checks.append(("Phone echoed", data.get("phone") == payload["phone"]))
        # Blank optional strings should become null
        checks.append(("Email is None", data.get("email") is None))
        checks.append(("City is None", data.get("city") is None))
        
        all_passed = all(check[1] for check in checks)
        
        for check_name, check_result in checks:
            print(f"  {'✓' if check_result else '✗'} {check_name}")
        
        if "id" in data:
            created_lead_ids.append(data["id"])
            print(f"  Created lead ID: {data['id']}")
        
        print_result(all_passed, f"Minimal lead creation {'successful' if all_passed else 'failed'}")
        return all_passed
    except Exception as e:
        print_result(False, f"Exception: {e}")
        return False

def test_create_lead_validation():
    """Test POST /api/leads validation errors"""
    print_test("POST /api/leads - Validation tests")
    
    test_cases = [
        {
            "name": "Missing name",
            "payload": {"phone": "+420777888999", "lang": "cs"},
            "expected_status": 422
        },
        {
            "name": "Phone too short (< 5 chars)",
            "payload": {"name": "Test User", "phone": "1234", "lang": "cs"},
            "expected_status": 422
        },
        {
            "name": "Name too short (1 char)",
            "payload": {"name": "A", "phone": "+420777888999", "lang": "cs"},
            "expected_status": 422
        },
        {
            "name": "Invalid source",
            "payload": {"name": "Test User", "phone": "+420777888999", "source": "foo", "lang": "cs"},
            "expected_status": 422
        },
        {
            "name": "Invalid lang",
            "payload": {"name": "Test User", "phone": "+420777888999", "lang": "en"},
            "expected_status": 422
        },
        {
            "name": "Extra unknown fields (should be ignored)",
            "payload": {"name": "Test User", "phone": "+420777888999", "lang": "cs", "unknownField": "value"},
            "expected_status": 201
        }
    ]
    
    results = []
    for test_case in test_cases:
        try:
            resp = requests.post(f"{BASE_URL}/leads", json=test_case["payload"], timeout=10)
            passed = resp.status_code == test_case["expected_status"]
            results.append(passed)
            print(f"  {'✓' if passed else '✗'} {test_case['name']}: expected {test_case['expected_status']}, got {resp.status_code}")
            
            # If we created a lead with extra fields, track it for cleanup
            if resp.status_code == 201:
                data = resp.json()
                if "id" in data:
                    created_lead_ids.append(data["id"])
        except Exception as e:
            results.append(False)
            print(f"  ✗ {test_case['name']}: Exception {e}")
    
    all_passed = all(results)
    print_result(all_passed, f"Validation tests {'passed' if all_passed else 'failed'}")
    return all_passed

def test_list_leads():
    """Test GET /api/leads"""
    print_test("GET /api/leads - List leads")
    try:
        resp = requests.get(f"{BASE_URL}/leads", timeout=10)
        data = resp.json()
        
        checks = []
        checks.append(("Status code 200", resp.status_code == 200))
        checks.append(("Response is array", isinstance(data, list)))
        
        # Check if newest first (if we have multiple leads)
        if len(data) >= 2:
            first_created = data[0].get("createdAt", "")
            second_created = data[1].get("createdAt", "")
            checks.append(("Newest first", first_created >= second_created))
        
        all_passed = all(check[1] for check in checks)
        
        for check_name, check_result in checks:
            print(f"  {'✓' if check_result else '✗'} {check_name}")
        
        print(f"  Total leads returned: {len(data)}")
        print_result(all_passed, f"List leads {'successful' if all_passed else 'failed'}")
        return all_passed
    except Exception as e:
        print_result(False, f"Exception: {e}")
        return False

def test_list_leads_filters():
    """Test GET /api/leads with filters"""
    print_test("GET /api/leads - Filter tests")
    
    test_cases = [
        {
            "name": "Filter by source=chat",
            "params": {"source": "chat"},
            "expected_status": 200
        },
        {
            "name": "Filter by status=new",
            "params": {"status": "new"},
            "expected_status": 200
        },
        {
            "name": "Limit to 1",
            "params": {"limit": 1},
            "expected_status": 200,
            "check_count": 1
        },
        {
            "name": "Invalid source=foo",
            "params": {"source": "foo"},
            "expected_status": 422
        },
        {
            "name": "Invalid limit=0",
            "params": {"limit": 0},
            "expected_status": 422
        }
    ]
    
    results = []
    for test_case in test_cases:
        try:
            resp = requests.get(f"{BASE_URL}/leads", params=test_case["params"], timeout=10)
            passed = resp.status_code == test_case["expected_status"]
            
            # Additional check for limit
            if "check_count" in test_case and resp.status_code == 200:
                data = resp.json()
                count_check = len(data) <= test_case["check_count"]
                passed = passed and count_check
                print(f"  {'✓' if passed else '✗'} {test_case['name']}: expected {test_case['expected_status']}, got {resp.status_code}, count={len(data)}")
            else:
                print(f"  {'✓' if passed else '✗'} {test_case['name']}: expected {test_case['expected_status']}, got {resp.status_code}")
            
            results.append(passed)
        except Exception as e:
            results.append(False)
            print(f"  ✗ {test_case['name']}: Exception {e}")
    
    all_passed = all(results)
    print_result(all_passed, f"Filter tests {'passed' if all_passed else 'failed'}")
    return all_passed

def test_get_lead_stats():
    """Test GET /api/leads/stats"""
    print_test("GET /api/leads/stats - Statistics")
    try:
        resp = requests.get(f"{BASE_URL}/leads/stats", timeout=10)
        data = resp.json()
        
        checks = []
        checks.append(("Status code 200", resp.status_code == 200))
        checks.append(("Has 'total' field", "total" in data))
        checks.append(("Has 'bySource' field", "bySource" in data))
        checks.append(("Has 'byStatus' field", "byStatus" in data))
        checks.append(("'total' is int", isinstance(data.get("total"), int)))
        checks.append(("'bySource' is dict", isinstance(data.get("bySource"), dict)))
        checks.append(("'byStatus' is dict", isinstance(data.get("byStatus"), dict)))
        
        all_passed = all(check[1] for check in checks)
        
        for check_name, check_result in checks:
            print(f"  {'✓' if check_result else '✗'} {check_name}")
        
        print(f"  Stats: {data}")
        print_result(all_passed, f"Stats endpoint {'successful' if all_passed else 'failed'}")
        return all_passed
    except Exception as e:
        print_result(False, f"Exception: {e}")
        return False

def test_get_lead_by_id():
    """Test GET /api/leads/{id}"""
    print_test("GET /api/leads/{id} - Get single lead")
    
    # Test with a created lead ID
    if not created_lead_ids:
        print_result(False, "No created leads to test with")
        return False
    
    results = []
    
    # Test valid ID
    try:
        lead_id = created_lead_ids[0]
        resp = requests.get(f"{BASE_URL}/leads/{lead_id}", timeout=10)
        data = resp.json()
        
        passed = resp.status_code == 200 and data.get("id") == lead_id
        results.append(passed)
        print(f"  {'✓' if passed else '✗'} Valid ID: expected 200, got {resp.status_code}")
    except Exception as e:
        results.append(False)
        print(f"  ✗ Valid ID: Exception {e}")
    
    # Test random UUID (404)
    try:
        random_id = "00000000-0000-0000-0000-000000000000"
        resp = requests.get(f"{BASE_URL}/leads/{random_id}", timeout=10)
        passed = resp.status_code == 404
        results.append(passed)
        print(f"  {'✓' if passed else '✗'} Random UUID: expected 404, got {resp.status_code}")
    except Exception as e:
        results.append(False)
        print(f"  ✗ Random UUID: Exception {e}")
    
    all_passed = all(results)
    print_result(all_passed, f"Get lead by ID {'successful' if all_passed else 'failed'}")
    return all_passed

def test_update_lead():
    """Test PATCH /api/leads/{id}"""
    print_test("PATCH /api/leads/{id} - Update lead")
    
    if not created_lead_ids:
        print_result(False, "No created leads to test with")
        return False
    
    results = []
    
    # Test valid update
    try:
        lead_id = created_lead_ids[0]
        payload = {"status": "contacted", "note": "Called customer"}
        resp = requests.patch(f"{BASE_URL}/leads/{lead_id}", json=payload, timeout=10)
        data = resp.json()
        
        checks = [
            resp.status_code == 200,
            data.get("status") == "contacted",
            data.get("note") == "Called customer",
            "updatedAt" in data
        ]
        passed = all(checks)
        results.append(passed)
        print(f"  {'✓' if passed else '✗'} Valid update: expected 200, got {resp.status_code}, status={data.get('status')}")
    except Exception as e:
        results.append(False)
        print(f"  ✗ Valid update: Exception {e}")
    
    # Test empty body (400)
    try:
        lead_id = created_lead_ids[0]
        resp = requests.patch(f"{BASE_URL}/leads/{lead_id}", json={}, timeout=10)
        passed = resp.status_code == 400
        results.append(passed)
        print(f"  {'✓' if passed else '✗'} Empty body: expected 400, got {resp.status_code}")
    except Exception as e:
        results.append(False)
        print(f"  ✗ Empty body: Exception {e}")
    
    # Test invalid status (422)
    try:
        lead_id = created_lead_ids[0]
        payload = {"status": "invalid_status"}
        resp = requests.patch(f"{BASE_URL}/leads/{lead_id}", json=payload, timeout=10)
        passed = resp.status_code == 422
        results.append(passed)
        print(f"  {'✓' if passed else '✗'} Invalid status: expected 422, got {resp.status_code}")
    except Exception as e:
        results.append(False)
        print(f"  ✗ Invalid status: Exception {e}")
    
    # Test unknown ID (404)
    try:
        random_id = "00000000-0000-0000-0000-000000000000"
        payload = {"status": "contacted"}
        resp = requests.patch(f"{BASE_URL}/leads/{random_id}", json=payload, timeout=10)
        passed = resp.status_code == 404
        results.append(passed)
        print(f"  {'✓' if passed else '✗'} Unknown ID: expected 404, got {resp.status_code}")
    except Exception as e:
        results.append(False)
        print(f"  ✗ Unknown ID: Exception {e}")
    
    all_passed = all(results)
    print_result(all_passed, f"Update lead {'successful' if all_passed else 'failed'}")
    return all_passed

def test_delete_lead():
    """Test DELETE /api/leads/{id}"""
    print_test("DELETE /api/leads/{id} - Delete lead")
    
    if not created_lead_ids:
        print_result(False, "No created leads to test with")
        return False
    
    results = []
    
    # Test valid delete
    try:
        lead_id = created_lead_ids[0]
        resp = requests.delete(f"{BASE_URL}/leads/{lead_id}", timeout=10)
        passed = resp.status_code == 204
        results.append(passed)
        print(f"  {'✓' if passed else '✗'} Valid delete: expected 204, got {resp.status_code}")
        
        # Remove from tracking list
        if passed:
            created_lead_ids.remove(lead_id)
    except Exception as e:
        results.append(False)
        print(f"  ✗ Valid delete: Exception {e}")
    
    # Test delete again (404)
    try:
        resp = requests.delete(f"{BASE_URL}/leads/{lead_id}", timeout=10)
        passed = resp.status_code == 404
        results.append(passed)
        print(f"  {'✓' if passed else '✗'} Delete again: expected 404, got {resp.status_code}")
    except Exception as e:
        results.append(False)
        print(f"  ✗ Delete again: Exception {e}")
    
    all_passed = all(results)
    print_result(all_passed, f"Delete lead {'successful' if all_passed else 'failed'}")
    return all_passed

def cleanup_test_leads():
    """Delete all test leads created during testing"""
    print_test("CLEANUP - Deleting test leads")
    
    if not created_lead_ids:
        print("  No leads to clean up")
        return True
    
    success_count = 0
    for lead_id in created_lead_ids[:]:  # Copy list to avoid modification during iteration
        try:
            resp = requests.delete(f"{BASE_URL}/leads/{lead_id}", timeout=10)
            if resp.status_code in [204, 404]:  # 404 is OK if already deleted
                success_count += 1
                print(f"  ✓ Deleted lead {lead_id}")
            else:
                print(f"  ✗ Failed to delete lead {lead_id}: status {resp.status_code}")
        except Exception as e:
            print(f"  ✗ Failed to delete lead {lead_id}: {e}")
    
    print(f"\n  Cleaned up {success_count}/{len(created_lead_ids)} leads")
    return success_count == len(created_lead_ids)

def main():
    """Run all tests"""
    print("\n" + "="*80)
    print("BACKEND API TESTS - Tài Chính An Tâm")
    print(f"Base URL: {BASE_URL}")
    print("="*80)
    
    results = {}
    
    # Run tests in order
    results["Root endpoint"] = test_root()
    results["Health check"] = test_health()
    results["Create lead (full)"] = test_create_lead_full()
    results["Create lead (minimal)"] = test_create_lead_minimal()
    results["Create lead validation"] = test_create_lead_validation()
    results["List leads"] = test_list_leads()
    results["List leads filters"] = test_list_leads_filters()
    results["Get lead stats"] = test_get_lead_stats()
    results["Get lead by ID"] = test_get_lead_by_id()
    results["Update lead"] = test_update_lead()
    results["Delete lead"] = test_delete_lead()
    
    # Cleanup
    cleanup_test_leads()
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print(f"\n{passed}/{total} tests passed")
    print("="*80)
    
    # Exit with appropriate code
    sys.exit(0 if passed == total else 1)

if __name__ == "__main__":
    main()
