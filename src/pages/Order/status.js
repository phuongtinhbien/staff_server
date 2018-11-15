const PENDING = "PENDING";
const PENDING_SERVING = "PENDING_SERVING";
const RECEIVED = "RECEIVED";
const SERVING = "SERVING";
const FINISHED_SERVING = "FINISHED_SERVING";
const APPROVED = "APPROVED";
const PENDING_DELIVERY = "PENDING_DELIVERY";
const FINISHED = "FINISHED";
const DECLINED = "DECLINED";



function main (status){
    if (status === PENDING){
        return "Đang chờ";
    }
    else if (status === PENDING_SERVING){
        return "Đang chờ xử lí";
    }
    else if (status === RECEIVED){
        return "Đã nhận đồ";
    }
    else if (status === SERVING){
        return "Đang xử lí";
    }
    else if (status === FINISHED_SERVING){
        return "Xử lí hoàn tất";
    }
    else if (status === APPROVED){
        return "Đã xác nhận";
    }
    else if (status === PENDING_DELIVERY){
        return "Đang chờ trả đồ";
    }
    else if (status === FINISHED){
        return "Hoàn tất";
    }
    else if (status === DECLINED){
        return "Đã hủy";
    }
}

export default main;