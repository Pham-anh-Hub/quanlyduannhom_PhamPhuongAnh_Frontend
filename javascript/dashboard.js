const listProject = JSON.parse(localStorage.getItem("listProject")) || [];

// Lấy ra danh sách mảng chứa tài khoản người dùng
const userAccounts = JSON.parse(localStorage.getItem("userAccounts"));
const alreadyLogIn = JSON.parse(localStorage.getItem("alreadyLogIn")); // Biến kiểm tra trạng thái đăng nhập
const userLoging = JSON.parse(localStorage.getItem("userLoging"));

// Lọc ra các dự án mà người đang đăng nhập tạo ra
const filterProject = listProject.filter(
  (item) => item.owerId === userLoging.id && userLoging.role === "projectOwner"
);
console.log("filterProject: ", filterProject);
// Lọc ra các dự án mà người đang đăng nhập là thành viên

// Nơi khai báo các thành phần của trang chính
const tableManagePrj = document.querySelector("#tbody");
const BtnPageElement = document.querySelector("#numberPageElement");
const btnPrevPage = document.querySelector("#PrevBtnBox");
const btnNextPage = document.querySelector("#NextBtnBox");
const addProjectBtn = document.querySelector("#addProjectBtn");
let addEditStatus = "add"; // Biến kiểm tra trạng thái thêm hay sửa dự án

// Hàm renderPage
let currentPage = 1; // Mặc định trang đầu tiên là 1
// totalPerPage
const totalPerPage = 5;
let totalPages;
let start = 0; // Biến cho vị trí bắt đầu
let end = 4; // Biến cho vị trí kết thúc
// Mặc định giá trị bắt đầu vfa kết thúc cho danh sách trang đầu tiên

if (!userAccounts || alreadyLogIn === null) {
  // Kiểm tra xem trên local đã có tài khoản người dùng chưa, nếu chưa --> yc đăng kí
  window.location.href = "register.html";
} else {
  // Nếu đã có, kiểm tra xem đã đăng nhập chưa --> yc đăng nhập
  if (alreadyLogIn === false) {
    window.location.href = "logIn.html";
  } else {
    // Hàm render danh sách dự án
    function renderProjectList() {
      tableManagePrj.innerHTML = "";
      // Lọc ra các dự án mà người đang đăng nhập tạo ra
      const filterProject = listProject.filter(
        (item) =>
          item.owerId === userLoging.id && userLoging.role === "projectOwner"
      );

      start = (currentPage - 1) * totalPerPage;
      end = currentPage * totalPerPage;

      if (end >= filterProject.length) {
        end = filterProject.length; // Nếu vị trí kết thúc theo công thức lớn hơn tổng số dự án trong mảng thì gán lại cho end bằng listProject.length luôn
      }
      for (let i = start; i < end; i++) {
        tableManagePrj.innerHTML += `<tr>
                                                <td id="idPrj">${i + 1}</td>
                                                <td id="namePrj">${
                                                  filterProject[i].projectName
                                                }</td>
                                                <td id="actionToPrj">
                                                    <button id="editBtn" onclick ="editPrjInfor(${i})">Sửa</button
                                                    ><button id="deleteBtn" onclick="deleteProject(${i})">Xóa</button
                                                    ><button id="showMoreBtn" onclick="showProject(${i})">Chi tiết</button>
                                                </td>
                                            </tr>`;
      }
      console.log("tableProjectList: ", tableManagePrj);
    }
    renderProjectList();
    renderPage();

    // Hàm render danh sách phân trang
    function renderPage() {
      const filterProject = listProject.filter(
        (item) =>
          item.owerId === userLoging.id && userLoging.role === "projectOwner"
      );
      // reset lại danh sách nút trang --> không bị lặp lại
      BtnPageElement.innerHTML = "";

      // total record - tổng số lượng project = listProject.length
      totalPages = Math.ceil(filterProject.length / totalPerPage);
      for (let i = 1; i <= totalPages; i++) {
        console.log("Nút số: ", i);

        //tạo ra element Button cho mỗi lần lặp
        const btnPage = document.createElement("button");
        console.log("btnPage: ", btnPage);

        btnPage.classList.add("buttonChild");
        // Gán tiêu đề cho button
        btnPage.textContent = i;

        // Kiểm tra xem trang nào đang được chọn --> thì active cho btn trang đó
        if (currentPage === i) {
          btnPage.classList.add("buttonChild-Active");
        }
        //Kiểm tra điều kiện cho nút Next và disabled
        if (currentPage === totalPages) {
          btnNextPage.setAttribute("disabled", true);
        } else {
          btnNextPage.removeAttribute("disabled");
        }

        // Tương tự kiểm tra điều kiện cho nút Prev và disable
        if (currentPage === 1) {
          btnPrevPage.setAttribute("disabled", true);
        } else {
          btnPrevPage.removeAttribute("disabled");
        }

        // tạo event click cho button đại diện cho trang
        btnPage.addEventListener("click", function () {
          // Khi click vào từng button thì ==> gán lại giá trị cho currentPage  = giá trị mà nút bấm vào
          currentPage = i;
          console.log("currentPage: ", currentPage);
          renderPage(); // render lại số trang
          renderProjectList(filterProject);
        });
        BtnPageElement.appendChild(btnPage);
      }
      // start = (currentPage - 1) * totalPerPage;
      // end = currentPage * totalPerPage;
    }

    // Thêm sự kiện cho các nút chuyển trang
    btnPrevPage.addEventListener("click", function () {
      //Thêm điều kiện kiểm tra, nếu vị trí nút hiện tại phải > 1
      if (currentPage > 1) {
        currentPage--;
        renderPage();
        renderProjectList(listProject);
      }
    });
    btnNextPage.addEventListener("click", function () {
      //Thêm điều kiện kiểm tra, nếu vị trí nút hiện tại phải > 1
      if (currentPage < totalPages) {
        currentPage++;
        renderPage();
        renderProjectList(listProject);
      }
    });
    // Hết phần phân trang

    // Nhấn đăng xuất thì chuyển tới trang đăng nhập (gán lại biến alreadyLogIn = false)
    document.querySelector("#logOutNav").addEventListener("click", function () {
      localStorage.setItem("alreadyLogIn", JSON.stringify(false));
    });

    // Tạo hàm Edit dự án
    function editPrjInfor(index) {
      // đưa trạng thái về edit
      addEditStatus = "edit";

      // Lọc ra các dự án mà người đang đăng nhập tạo ra
      const filterProject = listProject.filter(
        (item) =>
          item.owerId === userLoging.id && userLoging.role === "projectOwner"
      );
      console.log("filterProject: ", filterProject);
      // Lọc ra các dự án mà người đang đăng nhập là thành viên
      // console.log(listProject[index]);
      document.querySelector("#formAdd").style.display = "block";
      // Gán dữ liệu của dự án vào các phần của form sửa
      document.querySelector("#prjName").value =
        filterProject[index].projectName;
      document.querySelector("#prjDiscript").value =
        filterProject[index].discription;
      // Lấy giá trị và lưu lại khi nhấn nút SAVE
      document
        .querySelector(".saveEditBtn")
        .addEventListener("click", function () {
          const getNewProjectName = document.querySelector("#prjName").value;
          const getNewProjectDiscript =
            document.querySelector("#prjDiscript").value;
          if (!getNewProjectName || !getNewProjectDiscript) {
            // Thông báo dữ liệu trống
            document.querySelector("#errorInform").textContent =
              "Dữ liệu không được để trống";
            document.querySelector("#prjName").style.borderColor = "red";
            document.querySelector("#prjDiscript").style.borderColor = "red";
          } else {
            document.querySelector("#errorInform").textContent = "";
            document.querySelector("#prjName").style.borderColor = "#DEE2E6";
            document.querySelector("#prjDiscript").style.borderColor =
              "#DEE2E6";
            if (addEditStatus === "edit") {
              // const checkExitedProject = listProject.filter(
              //   (item) => item.projectName === getNewProjectName
              // );
              // if (checkExitedProject.length === 0) {
              document
                .querySelector("#prjName")
                .classList.remove("prjNameError");
              document.querySelector("#existErrorInform").textContent = "";
              document.querySelector("#prjName").style.borderColor = "#DEE2E6";

              filterProject[index].projectName = getNewProjectName;
              filterProject[index].discription = getNewProjectDiscript;
              localStorage.setItem("listProject", JSON.stringify(listProject));
              renderProjectList(filterProject);
              // Đóng form
              document.querySelector("#formAdd").style.display = "none";
              addEditStatus = "add"; // Đặt lại trạng thái về add
            }
          }
        });
    }

    // Tạo hàm xóa dự án
    function deleteProject(index) {
      const cancelDelBtn = document.querySelector("#cancelDelBtn");
      const confirmDelBtn = document.querySelector("#confirmDelBtn");
      const filterProject = listProject.filter(
        (item) =>
          item.owerId === userLoging.id && userLoging.role === "projectOwner"
      );

      document.querySelector("#confirmDeleteModel").style.display = "block";
      confirmDelBtn.onclick = function () {
        // Đã xác nhận --> tiến hành xóa
        console.log("Dự án cần xóa: ", filterProject[index]);
        const indexProjectToDelete = listProject.findIndex(
          (item) => item.projectName === filterProject[index].projectName
        );
        console.log("vị trí projectToDelete: ", indexProjectToDelete);

        // Gán lại giá trị cho listProject
        listProject.splice(indexProjectToDelete, 1);
        renderProjectList(filterProject);
        localStorage.setItem("listProject", JSON.stringify(listProject));
        renderPage();
        document.querySelector("#confirmDeleteModel").style.display = "none";
      };
      // hủy xóa
      cancelDelBtn.addEventListener("click", function () {
        document.querySelector("#confirmDeleteModel").style.display = "none";
      });
      document
        .querySelector("#iconExitDel")
        .addEventListener("click", function () {
          document.querySelector("#confirmDeleteModel").style.display = "none";
        });
    }

    // Tạo Hàm thêm dự án
    addProjectBtn.addEventListener("click", function () {
      const filterProject = listProject.filter(
        (item) =>
          item.owerId === userLoging.id && userLoging.role === "projectOwner"
      );
      document.querySelector("#formAdd").style.display = "block";
      resetFormAdd();
      document.querySelector("#errorInform").textContent = "";
      document.querySelector("#existErrorInform").textContent = "";

      // Set dữ liệu nhập từ input vào mảng danh sách khi nhấn button SAVE
      document.querySelector("#saveBtn").addEventListener("click", function () {
        const addProjectNameValue = document.querySelector("#prjName").value;
        const addProjectDiscriptValue =
          document.querySelector("#prjDiscript").value;

        if (!addProjectNameValue || !addProjectDiscriptValue) {
          // Nếu dữ liệu từ input rỗng --> thông báo
          document.querySelector("#errorInform").textContent =
            "Dữ liệu không được để trống";
          document.querySelector("#prjName").style.borderColor = "red";
          document.querySelector("#prjDiscript").style.borderColor = "red";
        } else {
          // resetFormAdd();
          // Dữ liệu đã đc fill --> check xem tồn tại chưa
          const checkExitedProject = filterProject.filter(
            (item) => item.projectName === addProjectNameValue
          );
          if (addEditStatus === "add") {
            if (checkExitedProject.length !== 0) {
              // Tên dự án đã tồn tại
              document.querySelector("#existErrorInform").textContent =
                "Tên dự án không được trùng nhau";
              document.querySelector("#prjName").style.borderColor = "red";
            } else if (addProjectDiscriptValue.length <= 50) {
              // Mô tả dự án quá ngắn
              document.querySelector("#errorInform").textContent =
                "Mô tả dự án quá ngắn";
              document.querySelector("#prjDiscript").style.borderColor = "red";
            } else {
              // Chưa tồn tại
              document.querySelector("#existErrorInform").textContent = "";
              document.querySelector("#errorInform").textContent = "";
              document.querySelector("#prjName").style.borderColor = "#DEE2E6";
              document.querySelector("#prjDiscript").style.borderColor =
                "#DEE2E6";

              // Lọc ra các dự án mà người đang đăng nhập tạo ra

              console.log("filterProject: ", filterProject);
              // Lọc ra các dự án mà người đang đăng nhập là thành viên

              // Tạo thành viên mặc định ban đầu --> và gán cho nó là người phụ trách dự án luôn
              userLoging.role = "projectOwner";
              const memberNum1 = {
                id: userLoging.id,
                fullName: userLoging.fullName,
                email: userLoging.email,
                role: userLoging.role,
              };
              // set lại cả role cho người dùng đang đăng nhập vai trò
              // tìm ra
              userAccounts.find((user) => user.id === userLoging.id).role =
                "projectOwner";

              let newProject = {
                id: Math.round(Math.random() * 1000),
                projectName: addProjectNameValue,
                discription: addProjectDiscriptValue,
                member: [memberNum1],
                owerId: userLoging.id,
                tasks: [],
              };
              console.log("newProject: ", newProject);
              listProject.push(newProject);
              console.log(listProject);
              renderProjectList(filterProject);
              renderPage();
              localStorage.setItem("listProject", JSON.stringify(listProject));
              localStorage.setItem("userLoging", JSON.stringify(userLoging));
              localStorage.setItem(
                "userAccounts",
                JSON.stringify(userAccounts)
              );
              document.querySelector("#formAdd").style.display = "none";
              resetFormAdd();
            }
          }
        }
      });
    });

    // Hàm tìm kiếm dự án
    function searchProject() {
      const filterProject = listProject.filter(
        (item) =>
          item.owerId === userLoging.id && userLoging.role === "projectOwner"
      );
      const searchBoxValue = document
        .querySelector("#inputSearch")
        .value.trim();
      console.log(searchBoxValue);

      if (searchBoxValue === "") {
        document.querySelector("#errorSearch").textContent = "";
        renderProjectList();
      } else {
        tableManagePrj.innerHTML = "";
        const projectSearch = filterProject.filter((project) =>
          project.projectName.includes(searchBoxValue)
        );

        if (projectSearch.length > 0) {
          document.querySelector("#errorSearch").textContent = "";
          start = 0;
          end = projectSearch.length;

          if (end >= projectSearch.length) {
            end = projectSearch.length; // Nếu vị trí kết thúc theo công thức lớn hơn tổng số dự án trong mảng thì gán lại cho end bằng listProject.length luôn
          }
          for (let i = start; i < end; i++) {
            tableManagePrj.innerHTML += `<tr>
                                                      <td id="idPrj">${
                                                        i + 1
                                                      }</td>
                                                      <td id="namePrj">${
                                                        projectSearch[i]
                                                          .projectName
                                                      }</td>
                                                      <td id="actionToPrj">
                                                          <button id="editBtn" onclick ="editPrjInfor(${i})">Sửa</button>
                                                          <button id="deleteBtn" onclick="deleteProject(${i})">Xóa</button>
                                                          <button id="showMoreBtn" onclick="showProject(${i})">Chi tiết</button>
                                                      </td>
                                                  </tr>`;
          }
          console.log("tableProjectList: ", tableManagePrj);
        } else {
          document.querySelector(
            "#errorSearch"
          ).textContent = `Không tìm thấy dự án`;
        }
      }
    }

    // Hàm xem chi tiết dự án
    function showProject(index) {
      const filterProject = listProject.filter(
        (item) =>
          item.owerId === userLoging.id && userLoging.role === "projectOwner"
      );
      console.log("dự án cần xem: ", filterProject[index]);
      const projectOpenIndex = listProject.findIndex(
        (item) => item === filterProject[index]
      );
      console.log("vị trí projectOpen trong list lớn: ", projectOpenIndex);

      window.location.href = `project-manager.html?task=${projectOpenIndex}`;
    }

    // Chức năng chung
    // Nếu nhấn nút HỦY thì giữ nguyên và gán ngược lại
    document.querySelector("#cancelAdd").addEventListener("click", function () {
      document.querySelector("#formAdd").style.display = "none";
      document.querySelector("#prjName").style.borderColor = "#DEE2E6";
      document.querySelector("#prjDiscript").style.borderColor = "#DEE2E6";
      document.querySelector("#errorInform").textContent = "";
      document.querySelector("#existErrorInform").textContent = "";
    });
    // Tương tự với nút X (thoát)
    document.querySelector("#iconExit").addEventListener("click", function () {
      document.querySelector("#formAdd").style.display = "none";
      document.querySelector("#prjName").style.borderColor = "#DEE2E6";
      document.querySelector("#prjDiscript").style.borderColor = "#DEE2E6";
      document.querySelector("#errorInform").textContent = "";
      document.querySelector("#existErrorInform").textContent = "";
    });
  }
}

function resetFormAdd() {
  document.querySelector("#prjName").value = "";
  document.querySelector("#prjDiscript").value = "";
  document.querySelector("#prjName").style.borderColor = "#DEE2E6";
  document.querySelector("#prjDiscript").style.borderColor = "#DEE2E6";
}
