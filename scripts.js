document.addEventListener("DOMContentLoaded", () => {
    const chatbotToggle = document.getElementById("chatbotToggle");
    const chatbotWindow = document.getElementById("chatbotWindow");
    const closeChatbot = document.getElementById("closeChatbot");
    const sendMessage = document.getElementById("sendMessage");
    const userInput = document.getElementById("userInput");
    const chatbotMessages = document.getElementById("chatbotMessages");

    let isFirstOpen = true;

    // Objek pertanyaan dan jawaban dengan sinonim
    const qaPairs = [
        {
            patterns: [/halo/i, /hi/i, /hello/i, /hai/i, /permisi/i, /misi min/i, /halo gan/i, /permisi gan/i, /halo gaes/i],
            response: "Halo! Ada yang bisa saya bantu?"
        },
        {
            patterns: [/iya/i, /oke/i, /okedeh/i],
            response: "Baik! Bagaimana ada lagi yang bisa kami bantu?"
        },
        {
            patterns: [/apa kabar/i, /bagaimana kabarmu/i],
            response: "Saya baik, terima kasih! Bagaimana dengan Anda?"
        },
        {
            patterns: [/siapa kamu/i, /siapakah anda/i, /dengan siapa/i, /kamu siapa/i],
            response: "Saya adalah chatbot AKSpeed."
        },
        {
            patterns: [/bisa bantu apa/i, /bantuan/i],
            response: "Saya bisa membantu menjawab pertanyaan umum tentang perbaikan kendaraan motor anda."
        },
        {
            patterns: [/info alamat/i, /min alamat bengkel/i, /min lokasi dimana/i, /alamat bengkel dimana/i, /lokasi dimana/i],
            response: "Bengkel kami beralamat di Jl. Pemuda Kp. Pulo, Cipayung Jaya, Kec. Cipayung, Kota Depok, Jawa Barat 16437."
        },
        {
            patterns: [/layanan apa saja/i, /ada layanan apa saja ya/i, /mau service dong/i],
            response: "Kami menyediakan berbagai layanan seperti servis rutin, perawatan rutin, perbaikan mesin, perbaikan kelistrikan, perbaikan sistem suspensi, perawatan dan perbaikan body, upgrade dan modifikasi, serta pemeriksaan dan penyetelan lainnya."
        },
        {
            patterns: [/service rutin/i, /ingin melakukan service rutin/i],
            response: "Layanan servis rutin kami meliputi penggantian oli mesin, penggantian filter oli, pemeriksaan dan penggantian busi, pembersihan atau penggantian filter udara, serta penyetingan karburator atau throttle body (injeksi)."
        },
        {
            patterns: [/perawatan rutin/i, /ingin melakukan perawatan rutin/i],
            response: "Layanan perawatan rutin kami meliputi pelumasan rantai dan pemeriksaan ketegangan rantai, pemeriksaan dan penggantian kampas rem, penyelarasan roda dan pengecekan ban, pemeriksaan dan pengisian air radiator, serta penggantian cairan rem."
        },
        {
            patterns: [/perbaikan mesin/i, /ingin melakukan perbaikan mesin/i],
            response: "Kami juga melayani overhaul mesin, penggantian komponen mesin yang rusak seperti piston, ring piston, klep, pemeriksaan dan penggantian gasket mesin"
        },
        {
            patterns: [/perbaikan kelistrikan/i, /ingin melakukan perbaikan kelistrikan/i],
            response: "Layanan perbaikan kelistrikan kami meliputi pemeriksaan dan penggantian aki, perbaikan sistem starter, pemeriksaan dan perbaikan sistem pengapian, serta perbaikan lampu dan sistem kelistrikan lainnya."
        },
        {
            patterns: [/perbaikan suspensi/i, /ingin melakukan perbaikan suspensi/i],
            response: "Kami juga melayani penggantian atau perbaikan shock absorber, pemeriksaan dan penggantian bearing roda."
        },
        {
            patterns: [/perbaikan body/i, /ingin melakukan perbaikan body/i],
            response: "Layanan perbaikan body kami meliputi perbaikan atau penggantian fairing dan bodywork, pengecatan ulang atau touch-up cat."
        },
        {
            patterns: [/upgrade dan modifikasi/i, /ingin melakukan upgrade dan modifikasi/i],
            response: "Kami melayani pemasangan aksesoris tambahan seperti box, windshield, modifikasi mesin untuk meningkatkan performa, serta modifikasi estetika seperti pengecatan custom atau pemasangan decal."
        },
        {
            patterns: [/pemeriksaan dan penyetelan lainnya/i, /pemeriksaan dan penyetelan lainnya/i],
            response: "Kami juga melayani pemeriksaan sistem transmisi dan penggantian oli transmisi, penyetingan kopling, serta pemeriksaan lainnya."
        },
        {
            patterns: [/booking servis/i, /mau booking dong/i, /mau booking/i, /booking dong/i],
            response: "Anda dapat melakukan booking servis melalui telepon atau datang langsung ke bengkel kami."
        },
        {
            patterns: [/kontak/i, /kontak yang dapat dihubungi/i, /nomor yang dapat dihubungi/i],
            response: "Anda dapat menghubungi kami di nomor telepon 0812-3456-7890."
        },
        {
            patterns: [/metode pembayaran/i, /pembayarannya bagaimana ya/i],
            response: "Kami menerima pembayaran tunai, kartu debit, dan kartu kredit."
        },
        {
            patterns: [/harga servis rutin/i, /kalau service rutin berapa/i],
            response: "Harga servis rutin mulai dari Rp150.000, tergantung pada jenis motor dan layanan yang dibutuhkan."
        }
    ];

    chatbotToggle.addEventListener("click", () => {
        chatbotWindow.style.display = "block";
        if (isFirstOpen) {
            addMessage("Halo, Selamat datang di AKSpeed. Ada yang bisa kami bantu?", "bot");
            isFirstOpen = false;
        }
    });

    closeChatbot.addEventListener("click", () => {
        chatbotWindow.style.display = "none";
    });

    sendMessage.addEventListener("click", () => {
        const userText = userInput.value.trim();
        if (userText === "") return;

        addMessage(userText, "user");
        userInput.value = "";

        // Cek apakah pertanyaan pengguna ada dalam daftar
        const botResponse = getBotResponse(userText) || "Maaf, saya tidak mengerti pertanyaan Anda.";
        setTimeout(() => {
            addMessage(botResponse, "bot");
        }, 1000);
    });

    function getBotResponse(userText) {
        for (let qa of qaPairs) {
            for (let pattern of qa.patterns) {
                if (pattern.test(userText)) {
                    return qa.response;
                }
            }
        }
        return null;
    }

    function addMessage(text, sender) {
        const messageElement = document.createElement("div");
        messageElement.className = `message ${sender}`;
        messageElement.textContent = text;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});