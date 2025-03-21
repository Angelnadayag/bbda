document.addEventListener("DOMContentLoaded", function () {
  const profileForm = document.getElementById("profileForm");

  if (profileForm) {
    profileForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const firstName = document.getElementById("firstName").value.trim();
      const middleInitial = document
        .getElementById("middleInitial")
        .value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const birthday = document.getElementById("birthday").value;
      const bio = document.getElementById("bio").value.trim();
      const quote = document.getElementById("quote").value.trim();
      const profilePic = document.getElementById("profilePic").files[0];

      localStorage.setItem(
        "name",
        `${firstName} ${middleInitial}. ${lastName}`
      );
      localStorage.setItem("birthday", birthday);
      localStorage.setItem("bio", bio);
      localStorage.setItem("quote", quote);

      if (profilePic) {
        const reader = new FileReader();
        reader.onload = function (e) {
          localStorage.setItem("profileImage", e.target.result);
          window.location.href = "feed.html";
        };
        reader.readAsDataURL(profilePic);
      } else {
        window.location.href = "feed.html";
      }
    });
  }

  if (document.getElementById("displayName")) {
    document.getElementById("displayName").textContent =
      localStorage.getItem("name") || "Unknown";
    document.getElementById("displayBirthday").textContent =
      localStorage.getItem("birthday") || "N/A";
    document.getElementById("displayBio").textContent =
      localStorage.getItem("bio") || "No bio available.";
    document.getElementById("displayQuote").textContent =
      localStorage.getItem("quote") || "No quote available.";

    const profileImage = localStorage.getItem("profileImage");
    if (profileImage) {
      document.getElementById("profileImage").src = profileImage;
    }
  }

  const postBtn = document.getElementById("postBtn");
  const postInput = document.getElementById("postInput");
  const feedContainer = document.getElementById("feedContainer");

  if (postBtn) {
    postBtn.addEventListener("click", function () {
      const postText = postInput.value.trim();
      if (postText !== "") {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
                    <p>${postText}</p>
                    <span class="heart">♡</span>
                `;

        feedContainer.prepend(postElement);

        if (feedContainer.children.length > 3) {
          feedContainer.removeChild(feedContainer.lastChild);
        }

        postInput.value = "";
      }
    });

    feedContainer.addEventListener("click", function (event) {
      if (event.target.classList.contains("heart")) {
        event.target.textContent =
          event.target.textContent === "♡" ? "❤️" : "♡";
      }
    });
  }
});
