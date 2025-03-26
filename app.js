async function downloadVideo() {
  const url = document.getElementById("videoUrl").value.trim();

  if (!url) {
    Swal.fire("Oops!", "Masukkan URL TikTok terlebih dahulu!", "error");
    return;
  }

  Swal.fire({
    title: "Loading...",
    text: "Mengambil video...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await fetch(
      `https://api.ferdev.my.id/downloader/tiktok?link=${encodeURIComponent(
        url
      )}`
    );
    const result = await response.json();

    if (result.data) {
      const videoNoWm = result.data.dlink.nowm;
      const videoWithWm = result.data.dlink.wm;
      const audio = result.data.dlink.audio;

      document.getElementById("videoPreview").src = videoNoWm;
      document.getElementById("downloadWithWm").href = videoWithWm;
      document.getElementById("downloadNoWm").href = videoNoWm;
      document.getElementById("downloadAudio").href = audio;

      document.getElementById("previewContainer").classList.remove("hidden");
      Swal.close();
    } else {
      Swal.fire("Gagal", "URL terjadi kesalahan", "error");
    }
  } catch (error) {
    Swal.fire("Gagal", "Gagal mengambil data dari API", "error");
  }
}
