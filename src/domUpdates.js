import $ from "jquery";

const domUpdates = {
    getUserName(name) {
        $("#header-name").text(`${name}'S FITLIT`);
    }
}

export default domUpdates;