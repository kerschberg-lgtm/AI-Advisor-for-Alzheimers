/* Login and account page logic. Passwordless sign-in through Supabase (magic link by email).
   No passwords are stored anywhere. Profile data is limited to non-health facts. */
(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || {};
  var el = function (id) { return document.getElementById(id); };
  var views = ["view-unconfigured", "view-signin", "view-sent", "view-account"];
  function show(id) { views.forEach(function (v) { var n = el(v); if (n) n.hidden = (v !== id); }); }
  function setMsg(id, text, kind) { var n = el(id); if (!n) return; n.textContent = text || ""; n.className = "form-msg" + (kind ? " " + kind : ""); n.hidden = !text; }

  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || !window.supabase) { show("view-unconfigured"); return; }

  var client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
  var currentUser = null;

  // ----- sign in -----
  el("signin-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var email = el("email").value.trim();
    if (!el("consent").checked) { setMsg("signin-msg", "Please confirm you have read the privacy policy.", "err"); return; }
    setMsg("signin-msg", "Sending your sign-in link…");
    client.auth.signInWithOtp({ email: email, options: { emailRedirectTo: window.location.origin + window.location.pathname } })
      .then(function (res) {
        if (res.error) { setMsg("signin-msg", res.error.message, "err"); return; }
        el("sent-email").textContent = email; show("view-sent");
      });
  });
  el("sent-back").addEventListener("click", function () { show("view-signin"); setMsg("signin-msg", ""); });

  // ----- account -----
  function loadProfile(user) {
    currentUser = user;
    el("acct-email").textContent = user.email;
    client.from("profiles").select("*").eq("id", user.id).maybeSingle().then(function (res) {
      var p = res.data || {};
      el("full_name").value = p.full_name || "";
      el("country").value = p.country || "";
      el("role").value = p.role || "";
      el("newsletter").checked = !!p.newsletter;
      Array.prototype.forEach.call(document.querySelectorAll("input[name=topics]"), function (cb) { cb.checked = (p.topics || []).indexOf(cb.value) !== -1; });
      show("view-account");
    });
  }
  el("profile-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var topics = Array.prototype.filter.call(document.querySelectorAll("input[name=topics]"), function (cb) { return cb.checked; }).map(function (cb) { return cb.value; });
    var row = { id: currentUser.id, full_name: el("full_name").value.trim(), country: el("country").value.trim(), role: el("role").value, topics: topics, newsletter: el("newsletter").checked, updated_at: new Date().toISOString() };
    setMsg("profile-msg", "Saving…");
    client.from("profiles").upsert(row).then(function (res) {
      setMsg("profile-msg", res.error ? res.error.message : "Saved.", res.error ? "err" : "ok");
    });
  });
  el("export-btn").addEventListener("click", function () {
    client.from("profiles").select("*").eq("id", currentUser.id).maybeSingle().then(function (res) {
      var data = { account: { email: currentUser.email, created_at: currentUser.created_at }, profile: res.data || null };
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "my-data.json"; a.click();
    });
  });
  el("signout-btn").addEventListener("click", function () { client.auth.signOut().then(function () { show("view-signin"); }); });
  el("delete-btn").addEventListener("click", function () {
    if (!window.confirm("Delete your account and all profile data? This cannot be undone.")) return;
    client.rpc("delete_own_account").then(function (res) {
      if (res.error) { setMsg("profile-msg", res.error.message, "err"); return; }
      client.auth.signOut().then(function () { show("view-signin"); setMsg("signin-msg", "Your account has been deleted.", "ok"); });
    });
  });

  // ----- session -----
  client.auth.getSession().then(function (res) {
    var s = res.data && res.data.session;
    if (s && s.user) loadProfile(s.user); else show("view-signin");
  });
  client.auth.onAuthStateChange(function (event, session) {
    if (session && session.user) loadProfile(session.user);
    else if (event === "SIGNED_OUT") show("view-signin");
  });
})();
