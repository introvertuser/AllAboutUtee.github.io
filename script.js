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
  var commentText = document.getElementById('comment-input').value;

  // Menambahkan komentar ke Firestore
  db.collection('comments').add({
      text: commentText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  // Membersihkan textarea setelah menambahkan komentar
  document.getElementById('comment-input').value = '';
}
// Memuat komentar saat halaman dimuat
window.onload = function () {
  loadComments();
};

// Fungsi untuk memuat komentar dari Firestore
function loadComments() {
  var commentsContainer = document.getElementById('comments-container');

  // Menghapus komentar yang sudah ada
  while (commentsContainer.firstChild) {
      commentsContainer.removeChild(commentsContainer.firstChild);
  }

  // Mengambil komentar dari Firestore dan menampilkannya
  db.collection('comments').orderBy('timestamp', 'desc').get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              var commentElement = document.createElement('div');
              commentElement.className = 'comment';
              commentElement.innerHTML = doc.data().text;
              commentsContainer.appendChild(commentElement);
          });
      })
      .catch((error) => {
          console.error("Error loading comments: ", error);
      });
}

