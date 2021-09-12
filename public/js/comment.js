const newCommentFormHandler = async (event) => {
  event.preventDefault();

  let content = document.querySelector('#comment-content').value.trim();

  let tempId = document.querySelector('#postid')
  tempId = tempId.getAttribute("data-postid");


  if (content) {
    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      body: JSON.stringify({ content, tempId }),
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
  event.preventDefault();

  if (event.target.hasAttribute('data-delid')) { //if delete button
    let id = event.target.getAttribute('data-delid');
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) { 
      document.location.reload();
     }
     else {
      alert('Failed to delete Post');
     }
  }

  if (event.target.hasAttribute('data-editid')) { // if edit button
    event.preventDefault();

    let id = event.target.getAttribute('data-editid');
    let content = document.querySelector('#comment-content').value.trim();

    if (content && id) {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ content, id }),
        headers: {'Content-Type': 'application/json'},
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to update Comment');
      }
    }
  }
};

document.querySelector('.comment-list').addEventListener('click', delEditButtonHandler);
document.querySelector('.new-comment-form').addEventListener('submit', newCommentFormHandler);
