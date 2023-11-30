module.exports = {
  addProfileToQuery(profile, keys) {
    if (profile.type === 'client') {
        return { [keys.client]: profile.id };
    } else if(profile.type === 'contractor') {
        return { [keys.contractor]: profile.id };
    }
  }
}