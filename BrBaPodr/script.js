document.querySelector("body").style.background = "cyan";
// for (let i = 0; i < 569; i++) {
//   document.querySelector(".txt").append("dziok");
// } //zostaf nie
const phoho = document.querySelector("#pawelforemnyziwonicza"),
   title = document.querySelector("#alan1"),
   sub1 = document.querySelector("#alan2"),
   sub2 = document.querySelector("#alan3"),
   nr = document.querySelector("#alan4"),
   zakres = document.querySelector("#alan5"),
   clr = document.querySelector("#alan6"),
   btn = document.querySelector("#alanDziokXD");

title.addEventListener("input", () => {
   document.querySelector(".title").innerText = title.value;
});
sub1.addEventListener("input", () => {
   document.querySelector(".sub1").innerText = sub1.value;
});
sub2.addEventListener("input", () => {
   document.querySelector(".sub2").innerText = sub2.value;
});
nr.addEventListener("input", () => {
   document.querySelector(".nr").innerText = nr.value;
   if (nr.value == "" || nr.value == null) {
      document.querySelector(".txt").style.width = "100%";
      document.querySelector(".nr").style.width = "0%";
   } else {
      document.querySelector(".txt").style.width = "80%";
      document.querySelector(".nr").style.width = "20%";
   }
});
phoho.addEventListener("input", () => {
   document.querySelector(".bg").style.backgroundImage = `url("${phoho.value}")`;
});
clr.addEventListener("input", () => {
   document.querySelector(".zakres").style.background = clr.value;
});
zakres.addEventListener("input", () => {
   document.querySelector(".zakres").innerText = zakres.value;
});
btn.addEventListener("mousedown", () => {
   window.print();
});
