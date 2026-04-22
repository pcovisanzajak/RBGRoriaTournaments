const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadAccount() {
  const { data: { user } } = await sb.auth.getUser();

  const { data } = await sb
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  document.getElementById("username").innerText = data.username;
  document.getElementById("bio").value = data.bio || "";

  document.getElementById("wins").innerText = data.wins || 0;
  document.getElementById("losses").innerText = data.losses || 0;
  document.getElementById("draws").innerText = data.draws || 0;
  document.getElementById("games").innerText = data.games_played || 0;
}

async function updateProfile() {
  const { data: { user } } = await sb.auth.getUser();

  const username = document.getElementById("editUsername").value;
  const bio = document.getElementById("bio").value;

  await sb.from('profiles').update({
    username,
    bio
  }).eq('id', user.id);

  alert("Profile updated!");
  loadAccount();
}

async function changePassword() {
  const newPass = document.getElementById("newPassword").value;

  const { error } = await sb.auth.updateUser({
    password: newPass
  });

  if (error) alert(error.message);
  else alert("Password changed!");
}

loadAccount();