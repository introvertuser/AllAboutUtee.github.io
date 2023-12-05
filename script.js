const images = document.querySelectorAll('#carousel img');
const pagination = document.querySelector('#pagination');

function createPaginationMarkers() {
  images.forEach((img) => {
    const imgViewName = `--${img.id}`;
    img.style.viewTimelineName = imgViewName;
    const marker = document.createElement('button');
    marker.type = 'button';
    marker.role = 'tab';
    marker.style.animationTimeline = imgViewName;
    marker.addEventListener('click', () => img.scrollIntoView());
    pagination.appendChild(marker);
  });

  document.body.style.timelineScope = `${Array.from(images).map(
    (image) => image.style.viewTimelineName
  )}`;
}

if (CSS.supports('view-timeline-axis', 'inline')) {
  createPaginationMarkers();
}

images[1].scrollIntoView();
function addComment() {
  // Mendapatkan nilai komentar dari textarea
  var commentText = document.getElementById('comment-input').value;

  // Membuat elemen div untuk komentar baru
  var commentElement = document.createElement('div');
  commentElement.className = 'comment';
  commentElement.innerHTML = commentText;

  // Menambahkan komentar ke dalam kontainer komentar
  var commentsContainer = document.getElementById('comments-container');
  commentsContainer.appendChild(commentElement);

  // Membersihkan textarea setelah menambahkan komentar
  document.getElementById('comment-input').value = '';
  
    // Menambahkan komentar ke Firestore
    db.collection('comments').add({
        text: commentText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Membersihkan textarea setelah menambahkan komentar
    document.getElementById('comment-input').value = '';

}