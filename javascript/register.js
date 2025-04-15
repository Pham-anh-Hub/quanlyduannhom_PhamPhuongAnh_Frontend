// Validate dữ liệu nhập vào khi người dùng đăng kí

const userAccounts = JSON.parse(localStorage.getItem("userAccounts")) || [];
const alreadyLogIn = JSON.parse(localStorage.getItem("alreadyLogIn"));

// Khai báo các thành phần để lấy dữ liẹu từ form đăng ký
const inputUserName = document.querySelector("#registerName");
const inputUserEmail = document.querySelector("#registerEmail");
const inputUserPass = document.querySelector("#registerPassword");
const inputConfirmPass = document.querySelector("#confirmPassword");
const btnRegister = document.querySelector("#registerBtn");
const errorRegister = document.querySelector("#errorRegister");

if (!userAccounts || !alreadyLogIn) {
  // Kiểm tra Item chứa tài khoản người dùng trên local, chưa có thì cho tạo mới
  // // Hàm kiểm tra dữ liệu nhập vào
  function validateData() {
    const inputUserNameValue = document.querySelector("#registerName").value;
    const inputUserEmailValue = document.querySelector("#registerEmail").value;
    const inputUserPassValue =
      document.querySelector("#registerPassword").value;
    const inputConfirmPassValue =
      document.querySelector("#confirmPassword").value;
    console.log(
      inputUserNameValue,
      inputUserEmailValue,
      inputUserPassValue,
      inputConfirmPassValue
    );

    // check email đã tồn tại chưa
    function validateEmail(email) {
      const emailExist = userAccounts.filter((user) => user.email === email);
      if (emailExist.length !== 0) {
        return 0;
      } else {
        return 1;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      inputUserNameValue.split(" ").length >= 2 &&
      inputUserNameValue.split(" ").length <= 5
    ) {
      if (emailRegex.test(inputUserEmailValue)) {
        errorRegister.textContent = "";
        if (validateEmail(inputUserEmailValue)) {
          // Email hợp lệ
          //email hợp lệ --> xét đến mật khẩu
          if (inputUserPassValue.length >= 8 && inputUserPassValue !== "") {
            // mật khẩu hợp lệ xét đến mk xác nhận
            if (inputConfirmPassValue === inputUserPassValue) {
              // tất cả điều kiện hợp lệ --> tạo tài khoản người dùng mới
              let newUser = {
                id: Math.round(Math.random() * 100),
                fullName: inputUserNameValue,
                email: inputUserEmailValue,
                password: inputUserPassValue,
                role: "",
              };
              userAccounts.push(newUser);
              console.log("userAccount: ", userAccounts);
              // reset lai input
              document.querySelector("#registerName").value = "";
              document.querySelector("#registerEmail").value = "";
              document.querySelector("#registerPassword").value = "";
              document.querySelector("#confirmPassword").value = "";
              errorRegister.textContent = "";
              // đăng kí thành công --> lưu vào local --> nhảy vào trang chính
              localStorage.setItem(
                "userAccounts",
                JSON.stringify(userAccounts)
              );
              localStorage.setItem("alreadyLogIn", JSON.stringify(true));
              localStorage.setItem("userLoging", JSON.stringify(newUser));
              window.location.reload();
              window.location.href = "dashboard.html";
            } else {
              console.log("trống");
              errorRegister.textContent = `Mật khẩu xác nhận không hợp lệ`;
            }
          } else {
            errorRegister.textContent = `Mật khẩu phải có ít nhất 8 ký tự`;
          }
        } else {
          errorRegister.textContent = `Email đã tồn tại`;
        }
      } else {
        errorRegister.textContent = `Email không hợp lệ`;
      }
    } else {
      errorRegister.textContent = `Vui lòng nhập họ và tên hợp lệ`;
    }
  }

  btnRegister.addEventListener("click", function () {
    validateData();
  });
} else {
  // Nếu đã có tài khoản thì nhảy luôn vào trang đăng nhập
  window.location.href = "login.html";
}
