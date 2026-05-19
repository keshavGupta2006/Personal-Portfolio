"""Backend API tests for Portfolio site."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://creative-hub-1062.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Health ----
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert r.json().get("message") == "Portfolio API online"


# ---- Projects ----
def test_list_projects(client):
    r = client.get(f"{API}/projects")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 4
    titles = {p["title"] for p in data}
    assert titles == {"Orbit Console", "Glasshouse Studio", "Paperweight", "Signal/Noise"}
    for p in data:
        for k in ("id", "index", "title", "role", "year", "stack", "description", "image"):
            assert k in p, f"missing {k}"
        assert isinstance(p["stack"], list) and len(p["stack"]) > 0
        assert "_id" not in p


def test_get_single_project(client):
    r = client.get(f"{API}/projects/proj-orbit")
    assert r.status_code == 200
    p = r.json()
    assert p["id"] == "proj-orbit"
    assert p["title"] == "Orbit Console"
    assert "_id" not in p


def test_get_project_404(client):
    r = client.get(f"{API}/projects/nonexistent")
    assert r.status_code == 404


# ---- Contact ----
def test_create_contact_success(client):
    payload = {"name": "TEST_user", "email": "test_user@example.com", "message": "Hello from pytest"}
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == "TEST_user"
    assert data["email"] == "test_user@example.com"
    assert data["message"] == "Hello from pytest"
    assert "id" in data and len(data["id"]) > 0
    assert "created_at" in data
    assert "_id" not in data

    # Verify persistence via list
    r2 = client.get(f"{API}/contact")
    assert r2.status_code == 200
    items = r2.json()
    assert any(it["id"] == data["id"] for it in items)
    # Newest first
    if len(items) > 1:
        first = items[0]["created_at"]
        last = items[-1]["created_at"]
        assert first >= last
    for it in items:
        assert "_id" not in it


def test_create_contact_invalid_email(client):
    r = client.post(f"{API}/contact", json={"name": "x", "email": "not-an-email", "message": "hi"})
    assert r.status_code == 422


def test_create_contact_empty_fields(client):
    r = client.post(f"{API}/contact", json={"name": "", "email": "a@b.com", "message": ""})
    assert r.status_code == 422
