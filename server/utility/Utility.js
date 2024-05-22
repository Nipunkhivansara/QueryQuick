async function getTransformedData(allUsersLinkedToNotebooks) {
  let transformedData = {};

  allUsersLinkedToNotebooks.forEach((item) => {
    // Check if the notebook_id already exists in transformedData
    if (!transformedData[item.notebook_id]) {
      // If not, create an entry for that notebook_id
      transformedData[item.notebook_id] = {
        notebook_id: item.notebook_id,
        notebook_name: item.name,
        associated_users: [],
      };
    }

    // Push the username to the respective notebook_id
    transformedData[item.notebook_id].associated_users.push({
      username: item.username,
      profile: item.profile,
    });
  });

  // Convert transformedData object into the desired array format
  let result = Object.values(transformedData).map((item) => ({
    notebook_id: item.notebook_id,
    notebook_name: item.notebook_name,
    associated_users: item.associated_users,
  }));

  return result;
}

module.exports = {
  getTransformedData,
};
