#!/bin/bash
set -e

mongo <<EOF
use admin 
db.createUser(
  {
    user: "${CHATS_DB_USER}",
    pwd: "${CHATS_DB_PASS}",
    roles:[{role: "userAdmin" , db:"${CHATS_DB_NAME}"}]})
  }
)

use ${CHATS_DB_NAME}
db.createCollection("users")
EOF