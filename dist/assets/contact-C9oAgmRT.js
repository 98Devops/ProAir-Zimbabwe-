import"./main-Bzcd-zxU.js";document.addEventListener("DOMContentLoaded",()=>{f()});function f(){const e=document.getElementById("contact-form"),c=document.querySelector(".form-content"),a=document.querySelector(".form-success");e&&(e.addEventListener("submit",n=>{var m;n.preventDefault();const r=e.querySelector("#name"),t=e.querySelector("#email"),l=e.querySelector("#phone"),u=e.querySelector("#message");let s=!0;if([r,t,l,u].forEach(o=>{o&&!o.value.trim()?(o.style.borderColor="var(--accent)",s=!1):o&&(o.style.borderColor="var(--gray-200)")}),t&&t.value&&!b(t.value)&&(t.style.borderColor="var(--accent)",s=!1),!s)return;const i=e.querySelector('button[type="submit"]');i.disabled=!0,i.textContent="Sending...";const d=encodeURIComponent(`ProAir Enquiry from ${r.value}`),y=((m=e.querySelector("#service"))==null?void 0:m.value)||"General",v=encodeURIComponent(`Name: ${r.value}
Email: ${t.value}
Phone: ${l.value}
Service: ${y}

Message:
${u.value}`);setTimeout(()=>{c&&(c.style.display="none"),a&&a.classList.add("show"),window.location.href=`mailto:info@proairzw.co.zw?subject=${d}&body=${v}`},800)}),e.querySelectorAll("input, textarea, select").forEach(n=>{n.addEventListener("input",()=>{n.style.borderColor="var(--gray-200)"})}))}function b(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}
