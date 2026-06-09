      document.querySelectorAll('a[href="#contacto"]').forEach(function (link) {
        link.addEventListener("click", function () {
          var input = document.getElementById("nombre");
          window.setTimeout(function () { input.focus(); }, 350);
        });
      });

      document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        var honeypot = document.getElementById("empresa_web").value.trim();
        var lastSentAt = Number(window.localStorage.getItem("sasoguLastWhatsappLead") || "0");
        var now = Date.now();
        var cooldownMs = 15000;

        if (honeypot !== "") return;

        if (now - lastSentAt < cooldownMs) {
          window.alert("Espera unos segundos antes de volver a enviar el formulario.");
          return;
        }

        var nombre = document.getElementById("nombre").value.trim();
        var centro = document.getElementById("centro").value.trim();
        var cargo = document.getElementById("cargo").value.trim();
        var telefono = document.getElementById("telefono").value.trim();

        var lineas = [
          "Hola Samuel, soy " + nombre + ".",
          "Mi centro es: " + centro + ".",
          cargo ? "Mi cargo: " + cargo + "." : "",
          "Mi teléfono o WhatsApp es: " + telefono + ".",
          "Me gustaría recibir una propuesta de formación para mi centro."
        ].filter(Boolean);

        var url = "https://wa.me/34607225259?text=" + encodeURIComponent(lineas.join("\n"));

        window.localStorage.setItem("sasoguLastWhatsappLead", String(now));
        window.open(url, "_blank");
      });
