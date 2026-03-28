import os

import requests
import streamlit as st


st.set_page_config(page_title="Request Analyzer", page_icon="🧪")
st.title("Temporary Request Analyzer Frontend")

default_api_url = os.getenv("API_URL", "http://localhost:8000/api/requests")
api_url = st.text_input("API endpoint", value=default_api_url)

with st.form("request_form"):
    company_name = st.text_input("Company name")
    web_url = st.text_input("Website URL")
    description = st.text_area("Request description", height=180)
    submitted = st.form_submit_button("Send request")

if submitted:
    payload = {
        "company_name": company_name.strip(),
        "web_url": web_url.strip(),
        "description": description.strip(),
    }

    if not all(payload.values()):
        st.error("Please fill in all fields before submitting.")
    else:
        try:
            with st.spinner("Calling backend..."):
                response = requests.post(api_url, json=payload, timeout=30)

            if response.ok:
                st.success(f"Success ({response.status_code})")
                st.json(response.json())
            else:
                st.error(f"Request failed ({response.status_code})")
                try:
                    st.json(response.json())
                except ValueError:
                    st.code(response.text)
        except requests.RequestException as exc:
            st.error(f"Connection error: {exc}")
