// getVideos.test.js
import { expect } from 'chai';
import sinon from 'sinon';
import initModels from '../../models/init-models.js';
import sequelize from '../../models/connect.js';
import { getVideos } from '../../controllers/videoControllers.js';

const model = initModels(sequelize)

describe('getVideos', () => {
    let req, res, findAllStub;

    beforeEach(() => {
        // Tạo các đối tượng request và response giả lập
        req = {}; // Điều chỉnh nếu có tham số request
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        // Stub phương thức findAll của model.video
        findAllStub = sinon.stub(model.video, 'findAll');
    });

    afterEach(() => {
        // Khôi phục lại phương thức bị stub
        findAllStub.restore();
    });

    it('nên trả về danh sách video phân trang với mã trạng thái 200', async () => {
        // Chuẩn bị dữ liệu giả lập
        const mockData = [{ id: 1, title: 'Video 1' }, { id: 2, title: 'Video 2' }];
        findAllStub.resolves(mockData);

        // Thực thi hàm getVideos
        await getVideos(req, res);

        // Kiểm tra kết quả trả về có đúng hay không
        expect(res.status.calledOnceWith(200)).to.be.true;
        expect(res.json.calledOnceWith(mockData)).to.be.true;
    });

    it('nên trả về mã trạng thái 500 và thông báo lỗi nếu xảy ra lỗi', async () => {
        // Đặt findAll thành reject để giả lập lỗi
        findAllStub.rejects(new Error('Database error'));

        // Thực thi hàm getVideos
        await getVideos(req, res);

        // Kiểm tra kết quả trả về khi có lỗi
        expect(res.status.calledOnceWith(500)).to.be.true;
        expect(res.json.calledOnceWith({ message: 'error for api get list videos' })).to.be.true;
    });
});
