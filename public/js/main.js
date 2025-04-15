


const editPostModal = document.getElementById('editPostModal');

editPostModal.addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget;
  const title = button.getAttribute('data-title');
  const content = button.getAttribute('data-content');
  const id = button.getAttribute('data-id');
  
  // Set values in the modal's input fields
  const modalTitle = editPostModal.querySelector('#postTitle');
  const modalContent = editPostModal.querySelector('#postContent');
  const modalId = editPostModal.querySelector('#postId');

  modalTitle.value = title;
  modalContent.value = content; 
  modalId.value = id; 
});


document.getElementById('saveChangesButton').addEventListener('click', function() {
  const postId = document.getElementById('postId').value; 
  const title = document.getElementById('postTitle').value; 
  const content = document.getElementById('postContent').value;


  if (!title || !content) {
    alert("Please fill in both title and content");
    return;
  }


  const updatedPost = {
    title: title,
    content: content
  };


  axios.put(`/posts/${postId}`, updatedPost)
    .then(response => {

      console.log('Post updated successfully:', response.data);

      const myModal = new bootstrap.Modal(document.getElementById('editPostModal'));
      myModal.hide();  

      // Refresh the page and show updated posts
      location.reload(); 
    })
    .catch(error => {
      console.error('Error updating post:', error);
      alert('There was an error updating the post. Please try again.');
    });
});






