#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Pixel-perfect clone of teya.com/cz design adapted to life insurance for Vietnamese community in CZ (brand taichinhantam). Bilingual CS/VI, Teya-like scroll animations, video section, calculator, packages, contact form. Backend stores leads (poptávky) in MongoDB."

backend:
  - task: "Leads API – create lead (POST /api/leads)"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Pydantic model LeadCreate (name/phone required, source enum contact|chat|package, lang cs|vi, optional calc {age,monthly,years}). Returns 201 with uuid id, status 'new', createdAt ISO."
      - working: true
        agent: "testing"
        comment: "✅ ALL TESTS PASSED. Tested: (1) Full payload with all fields - returns 201, uuid id, status 'new', createdAt ISO, all fields echoed correctly; (2) Minimal payload (chat source, name+phone+lang) - blank optional strings become null as expected; (3) Validation: missing name→422, phone<5 chars→422, name 1 char→422, invalid source 'foo'→422, invalid lang 'en'→422, extra unknown fields ignored (201). All validation rules working correctly."
  - task: "Leads API – list/get/patch/delete + stats"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "GET /api/leads (?source=&status=&limit=), GET /api/leads/{id} (404), PATCH /api/leads/{id} {status,note} (400 empty, 404), DELETE /api/leads/{id} (204/404), GET /api/leads/stats {total,bySource,byStatus}. Note: /leads/stats route declared before /leads/{id}."
      - working: true
        agent: "testing"
        comment: "✅ ALL TESTS PASSED. (1) GET /api/leads: returns array newest first, filters work (source=chat, status=new, limit=1), invalid source→422, limit=0→422; (2) GET /api/leads/stats: returns {total, bySource, byStatus} with correct counts, NOT shadowed by /leads/{id} route; (3) GET /api/leads/{id}: 200 for valid id, 404 for random uuid; (4) PATCH /api/leads/{id}: 200 with status updated & updatedAt set, empty body→400, invalid status→422, unknown id→404; (5) DELETE /api/leads/{id}: 204 on success, 404 on second delete. All endpoints working correctly."
  - task: "Health endpoint"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "GET /api/health pings Mongo."
      - working: true
        agent: "testing"
        comment: "✅ PASSED. GET /api/health returns 200 with {status:'ok', db:'ok'}. MongoDB connection verified."

frontend:
  - task: "Contact form submits lead to API"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/ContactPage.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Uses createLead from src/lib/api.js; shows success state + sonner toast; error toast on failure."
  - task: "Floating chat widget submits lead"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/Overlays.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "source=chat, name+phone."
  - task: "Home page Teya-like scroll hero, sections, language switch CS/VI, video dialog, calculator"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/*"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Verified visually via screenshots by main agent. Not yet tested by testing agent."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 2
  run_ui: false

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: "Backend leads API implemented in server.py. Please test all /api/leads endpoints incl. validation (missing name/phone -> 422, invalid source -> 422), 404s, stats aggregation, and that /api/leads/stats is not shadowed by /api/leads/{id}. Use REACT_APP_BACKEND_URL from frontend/.env as base."
  - agent: "main"
    message: "Rebranded to Pan Čung (khaki green + gold palette), added AboutSection (replaces StatsRow), hero uses /images/pan-cung-hero-wide.jpg, VI fonts switched (Dancing Script / Playfair Display). Nav 'Rezervovat hovor' + About/Contact booking buttons link externally to simplybook. Backend unchanged. Frontend verified visually via screenshots; automated frontend testing not yet run (awaiting user permission)."
  - agent: "testing"
    message: "✅ BACKEND TESTING COMPLETE - ALL TESTS PASSED (11/11). Created comprehensive backend_test.py covering all endpoints. Results: (1) GET /api/ ✅ (2) GET /api/health ✅ (3) POST /api/leads with full & minimal payloads ✅ (4) All validation rules (422 errors) ✅ (5) GET /api/leads with filters ✅ (6) GET /api/leads/stats (not shadowed) ✅ (7) GET /api/leads/{id} ✅ (8) PATCH /api/leads/{id} ✅ (9) DELETE /api/leads/{id} ✅. All test leads cleaned up. Backend API is fully functional with correct validation, error handling, and data persistence."
