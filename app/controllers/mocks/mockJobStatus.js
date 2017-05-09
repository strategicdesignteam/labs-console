exports.mock = {
  "id": 186,
  "type": "workflow_job",
  "url": "/api/v1/workflow_jobs/186/",
  "related": {
    "created_by": "/api/v1/users/1/",
    "unified_job_template": "/api/v1/workflow_job_templates/99/",
    "workflow_job_template": "/api/v1/workflow_job_templates/99/",
    "notifications": "/api/v1/workflow_jobs/186/notifications/",
    "workflow_nodes": "/api/v1/workflow_jobs/186/workflow_nodes/",
    "labels": "/api/v1/workflow_jobs/186/labels/",
    "activity_stream": "/api/v1/workflow_jobs/186/activity_stream/",
    "relaunch": "/api/v1/workflow_jobs/186/relaunch/",
    "cancel": "/api/v1/workflow_jobs/186/cancel/"
  },
  "summary_fields": {
    "workflow_job_template": {
      "id": 99,
      "name": "Workflow-test",
      "description": ""
    },
    "unified_job_template": {
      "id": 99,
      "name": "Workflow-test",
      "description": "",
      "unified_job_type": "workflow_job"
    },
    "created_by": {
      "id": 1,
      "username": "admin",
      "first_name": "",
      "last_name": ""
    },
    "user_capabilities": {
      "start": true,
      "delete": true
    },
    "labels": {
      "count": 0,
      "results": []
    }
  },
  "created": "2017-04-21T14:24:45.786Z",
  "modified": "2017-04-21T14:24:50.629Z",
  "name": "Workflow-test",
  "description": "",
  "unified_job_template": 99,
  "launch_type": "manual",
  "status": "successful",
  "failed": false,
  "started": "2017-04-21T14:24:45.941421Z",
  "finished": "2017-04-21T14:24:50.624099Z",
  "elapsed": 4.683,
  "job_args": "",
  "job_cwd": "",
  "job_env": {},
  "job_explanation": "",
  "result_stdout": "stdout capture is missing",
  "execution_node": "",
  "result_traceback": "",
  "workflow_job_template": 99,
  "extra_vars": "{\"test\": \"apples\"}"
}