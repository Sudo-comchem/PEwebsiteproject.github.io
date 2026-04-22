document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================= */

  const introOverlay = document.getElementById("introOverlay");

  const audio = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");
  const musicOn = document.getElementById("musicOn");
  const musicOff = document.getElementById("musicOff");

  const pagesWrapper = document.getElementById("pagesWrapper");
  const navButtons = document.querySelectorAll(".nav-btn");
  const progressIndicator = document.getElementById("progressIndicator");
  const floatingGif = document.getElementById("floatingGif");

  const nameInput = document.getElementById("nameInput");
  const messageBtn = document.getElementById("messageBtn");

  const letterMessage = document.getElementById("letterMessage");

  const pullText = document.getElementById("pullText");
  const pullImage = document.getElementById("pullImage");

  const slideshowImage = document.getElementById("slideshowImage");


  /* =========================
     MULTIPLE MUSIC
     Random song each visit
  ========================= */

  const musicList = [
    "website theme.mp3",
    "website theme 2.mp3",
    
  ];

  if (audio) {
    const randomSong = musicList[Math.floor(Math.random() * musicList.length)];
    audio.src = randomSong;
    audio.load();
    audio.loop = true;
    audio.volume = 0.6;

    function tryPlayMusic() {
      audio.play().then(() => {
        if (musicOn) musicOn.style.display = "block";
        if (musicOff) musicOff.style.display = "none";
      }).catch(() => {
        // autoplay blocked by browser
      });
    }

    // try autoplay immediately
    tryPlayMusic();

    // fallback on first interaction
    const startMusicOnInteraction = () => {
      if (audio.paused) {
        tryPlayMusic();
      }
      document.removeEventListener("click", startMusicOnInteraction);
      document.removeEventListener("touchstart", startMusicOnInteraction);
      document.removeEventListener("keydown", startMusicOnInteraction);
    };

    document.addEventListener("click", startMusicOnInteraction);
    document.addEventListener("touchstart", startMusicOnInteraction);
    document.addEventListener("keydown", startMusicOnInteraction);
  }


  /* =========================
     MUSIC TOGGLE BUTTON
  ========================= */

  if (musicBtn && audio) {
    musicBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (audio.paused) {
        audio.play().catch(() => {});
        if (musicOn) musicOn.style.display = "block";
        if (musicOff) musicOff.style.display = "none";
      } else {
        audio.pause();
        if (musicOn) musicOn.style.display = "none";
        if (musicOff) musicOff.style.display = "block";
      }
    });
  }


  /* =========================
     INTRO CARD DISAPPEARS
  ========================= */

  if (introOverlay) {
    setTimeout(() => {
      introOverlay.style.opacity = "0";

      setTimeout(() => {
        introOverlay.style.display = "none";
      }, 700);

    }, 5000);
  }


  /* =========================
     PAGE SLIDING
  ========================= */

  const progressPositions = [
    "5.6%",
    "23.3%",
    "69.8%",
    "85.8%"
  ];

  const gifPositions = [
    "4%",
    "21%",
    "68%",
    "82%"
  ];

  function showPage(index) {
    if (pagesWrapper) {
      pagesWrapper.style.transform = `translateX(-${index * 25}%)`;
    }

    navButtons.forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
    });

    if (progressIndicator) {
      progressIndicator.style.left = progressPositions[index];
    }

    if (floatingGif) {
      floatingGif.style.left = gifPositions[index];
    }
  }

  navButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      showPage(index);
    });
  });

  showPage(0);


  /* =========================
     NAME-BASED LETTER MESSAGE
     + RANDOM PULL IMAGE/TEXT
  ========================= */

  if (messageBtn && nameInput && letterMessage) {
    messageBtn.addEventListener("click", () => {

      const rawName = nameInput.value.trim();
      const name = rawName.toLowerCase();

      const isVan =
        ["vanessa", "vannessa", "van", "vanny", "jean", "delgado", "arocha", "vanessa jean delgado arocha"]
        .includes(name);

      const defaultMessage =
        "You did very well in this sem. Even if the results were not what you hoped for, your perseverance through doubt shows real strength. Keep going and trust the journey. Laban future RMT — maka graduate ra tang tanan.";

      const specialMessages = {
        "vanessa": `I admire you—well, it’s more like, I like you, Van.

<br><br>

Though we don’t really interact much, part of that is because I get shy around you. That’s why I wanted to say my feelings here, because for some reason, 'hi' is the only word I can ever utter when you’re around.

<br><br>

Seeing you smile is something I look forward to each day, and I feel a little down when you don’t greet me the usual way lmao. Well.. I don’t really ask for much.

<br><br>

I get the sense you may not be into these things... but I still want to tell you: I like you, and I find you adorable.

<br><br>

I catch myself looking at you often—sometimes our eyes meet before I even realize it... or maybe that’s just me.

<br><br>

For now, that’s all I can say. I don’t even know if you’ll read this or not, since I just slipped this message into my code hahaha.

<br><br>

But yeah, that’s all for now.

<br><br>

I’m rooting for you always. Maka graduate lagi ta tanan.

<br><br>

You did well this sem.

<br><br>

See you around, Vanessa.`,
        "stefanie":
          "yoww stef, good job this sem!! you did well, never give up boy laban lang ta always and if you need help ill be here. im rooting for you, maka graduate lagi ta tanan."
      };

      const randomPulls = [
        {
          text: "Babesia, Babesia, walay mo baby sa imoha?",
          image: "Randomizer/1(1023).png"
        },
        {
          text: "Malungay good for the eyes para sad mapansin ka sa imong crush",
          image: "Randomizer/1(1024).png"
        },
        {
          text: "Balerina, iba na pala gusto niya",
          image: "Randomizer/balerina.png"
        },
        {
          text: "crocodilo, di na siya interesado",
          image: "Randomizer/croco.png"
        },
        {
          text: "lirili larila akoy nauulila",
          image: "Randomizer/lili.jpg"
        },
        {
          text: "bombombini, miss you bb",
          image: "Randomizer/bombombini-gusini.png"
        }
      ];

      if (rawName === "") {
        letterMessage.innerHTML = "Please enter<br>your first name.";

        if (pullText) {
          pullText.textContent = "Please enter your name first.";
        }

        if (pullImage) {
          pullImage.style.display = "none";
          pullImage.src = "";
        }

        return;
      }

      if (isVan) {
        letterMessage.innerHTML =
          rawName + ",<br><br>" + specialMessages["vanessa"];
      } else if (specialMessages[name]) {
        letterMessage.innerHTML =
          rawName + ",<br><br>" + specialMessages[name];
      } else {
        letterMessage.innerHTML =
          rawName + ",<br><br>" + defaultMessage;
      }

      if (isVan) {
        if (pullText) {
          pullText.textContent = "SSR PULL!! The confession";
        }

        if (pullImage) {
          pullImage.src = "Randomizer/iringnanaayflowers.jpg";
          pullImage.style.display = "block";
        }

      } else {
        const pulled =
          randomPulls[Math.floor(Math.random() * randomPulls.length)];

        if (pullText) {
          pullText.textContent = pulled.text;
        }

        if (pullImage) {
          pullImage.src = pulled.image;
          pullImage.style.display = "block";
        }
      }

    });
  }


  /* =========================
     INTRO IMAGE SLIDESHOW
  ========================= */

  if (slideshowImage) {
    const slideshowImages = [
      "frontpictures/font picture.jpg",
      "frontpictures/frontpicture2.jpg",
      "frontpictures/frontpicture3.jpg",
      "frontpictures/frontpicture4.jpg"
    ];

    let slideIndex = 0;

    setInterval(() => {
      slideshowImage.style.opacity = "0";

      setTimeout(() => {
        slideIndex++;

        if (slideIndex >= slideshowImages.length) {
          slideIndex = 0;
        }

        slideshowImage.src = slideshowImages[slideIndex];
        slideshowImage.style.opacity = "1";

      }, 1000);

    }, 3000);
  }

});