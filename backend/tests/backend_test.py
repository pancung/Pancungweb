"""Backend smoke tests for calculators iteration."""
import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # fallback read from frontend .env
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.strip().split("=", 1)[1].rstrip("/")


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_health(api):
    r = api.get(f"{BASE_URL}/api/health", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "ok"


def test_get_leads(api):
    r = api.get(f"{BASE_URL}/api/leads", timeout=15)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


def test_create_calculator_lead(api):
    payload = {
        "source": "calculator",
        "name": "TEST_CalcUser",
        "phone": "+420777123456",
        "message": "Investiční kalkulačka: TEST",
        "calc": {"type": "invest", "summary": "TEST summary", "monthly": 5000, "years": 20},
        "lang": "cs",
    }
    r = api.post(f"{BASE_URL}/api/leads", json=payload, timeout=15)
    assert r.status_code == 201, r.text
    d = r.json()
    assert d["source"] == "calculator"
    assert d["name"] == "TEST_CalcUser"
    assert d["calc"]["type"] == "invest"
    lead_id = d["id"]
    # verify get
    r2 = api.get(f"{BASE_URL}/api/leads/{lead_id}", timeout=15)
    assert r2.status_code == 200
    assert r2.json()["id"] == lead_id
    # cleanup
    api.delete(f"{BASE_URL}/api/leads/{lead_id}", timeout=15)


def test_invalid_source_rejected(api):
    payload = {"source": "bogus", "name": "TEST_x", "phone": "12345"}
    r = api.post(f"{BASE_URL}/api/leads", json=payload, timeout=15)
    assert r.status_code == 422
