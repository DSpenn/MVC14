const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-content').value.trim();
    
  if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to post comment');
    }
  }
};

  const delEditButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-delid')) {
    let id = event.target.getAttribute('data-delid');
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });
  
  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to delete Post');
  }
}

if (event.target.hasAttribute('data-editid')) {
  let id = event.target.getAttribute('data-editid');
  const content = document.querySelector('#comment-content').value.trim();

  if (content && id) {
    const response = await fetch(`/api/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
      headers: {
      'Content-Type': 'application/json',
    },
});

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to update Comment');
  }
}}
};

document.querySelector('.comment-list').addEventListener('click', delEditButtonHandler);   
document.querySelector('.new-comment-form').addEventListener('submit', newCommentFormHandler);
