// Validate dữ liệu cho đăng nhập
const userAccounts = JSON.parse(localStorage.getItem("userAccounts")) || [];

// Khai báo biến để xác nhận là đã đăng nhập hay chưa
let alreadyLogIn = JSON.parse(localStorage.getItem("alreadyLogIn"));
localStorage.setItem("alreadyLogIn", JSON.stringify(alreadyLogIn));

const emailLogIn = document.querySelector("#emailLogIn");
const passwordLogIn = document.querySelector("#passwordLogIn");
const btnLogInElement = document.querySelector("#btnLogIn");
const errorEmailLogIn = document.querySelector("#errorEmailLogIn");

// Kiểm tra xem trên local đã có tài khoản người dùng chưa
if (userAccounts.length === 0) {
  // Nếu chưa có tài khoản --> yêu cầu đăng kí
  localStorage.setItem("alreadyLogIn", JSON.stringify(false));
  window.location.href = "register.html";
} else {
  if (!alreadyLogIn) {
    // Kiểm tra biến đã đăng nhập hay chưa, nếu chưa thì vào đăng nhập
    btnLogInElement.addEventListener("click", function () {
      const emailLogInValue = emailLogIn.value;
      const passwordLogInValue = passwordLogIn.value;

      if (emailLogInValue === "" || passwordLogInValue === "") {
        document.querySelector("#errorLogin").textContent =
          "Email và mật khẩu không được để trống";
        return;
      } else {
        document.querySelector("#errorLogin").textContent = "";
        const findUser = userAccounts.find(
          (user) => user.email === emailLogInValue
        );
        if (findUser == undefined) {
          console.log("Người dùng cần tìm: ", findUser);

          errorEmailLogIn.textContent = "Email người dùng không tồn tại";
        } else {
          errorEmailLogIn.textContent = "";

          console.log("Người dùng cần tìm: ", findUser);
          if (findUser.password === passwordLogInValue) {
            //tìm thấy người dùng và mật khẩu đúng
            document.querySelector("#errorPassLogIn").textContent = "";
            alreadyLogIn = true;
            localStorage.setItem("alreadyLogIn", JSON.stringify(alreadyLogIn));
            localStorage.setItem("userLoging", JSON.stringify(findUser));
            window.location.href = "dashboard.html";
          } else {
            document.querySelector("#errorPassLogIn").textContent =
              "Mật khẩu không chính xác";
          }
        }
      }
    });
  } else {
    // Tức là đã đang nhập, nhảy luôn vào trang chính
    window.location.href = "dashboard.html";
  }
}
