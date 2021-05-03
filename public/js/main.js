const liked = document.querySelectorAll(".fa-heart");

Array.from(liked).forEach((element) => {
  element.addEventListener("click", addLike);
});

async function addLike() {
  const likedEntry = this.parentNode.parentNode.childNodes[1].childNodes[1]
    .childNodes[1].innerText;
  const tLikes = Number(this.parentNode.childNodes[3].innerText);
  try {
    const response = await fetch("addOneLike", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        liked: likedEntry,
        numOfLikes: tLikes,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
