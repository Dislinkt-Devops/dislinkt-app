function jwt(data) {
    var parts = data.split('.').slice(0,2)
        .map(v=>Buffer.from(v, 'base64url').toString())
        .map(JSON.parse);
    return { headers: parts[0], payload: parts[1], signature: data.split('.')[2] };
}

function split_jwt_token(data) {
    return data.replace('Bearer ', '').split('.');
}

function jwt_payload(data) {
    return jwt(data.replace('Bearer ', ''));
}

function is_expired(payload) {
    var now = new Date();
    var expiration = new Date(payload.exp ? payload.exp * 1000 : 0)
    return now > expiration
}

function authorize(r) {
    if (!('Authorization' in r.headersIn)) {
        r.error('No authorization');
        r.return(401);
        return;
    }

    var parsed_token = jwt_payload(r.headersIn.Authorization);
    var splited_token = split_jwt_token(r.headersIn.Authorization);

    var h = require('crypto').createHmac('sha256', process.env.JWT_SECRET);

    h.update(splited_token.slice(0, 2).join('.'));

    var req_sig = h.digest("base64url");

    if (req_sig !== splited_token[2]) {
        r.error(`Invalid signature: ${req_sig}\n`);
        r.return(401);
        return;
    }

    if (is_expired(parsed_token.payload)) {
        r.error(`Token expired`);
        r.return(401);
        return;
    }

    r.return(200);
}

export default {authorize}
