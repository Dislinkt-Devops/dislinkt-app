#!/bin/bash
set -e

mongo <<EOF
use admin 
db.createUser(
  {
    user: "${CHATS_DB_USER}",
    pwd: "${CHATS_DB_PASS}",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)

use ${CHATS_DB_NAME}
db.createCollection("${CHATS_DB_NAME}")
EOF