import { expect } from 'chai';
import Sinon from 'sinon';
import initModels from '../../models/init-models.js';
import sequelize from '../../models/connect.js';
import { getTypes, getVideos } from '../../controllers/videoControllers.js';
import { describe, it } from 'mocha';

const model = initModels(sequelize);

// define bộ test case cho function getVideo
// test case 1: get video thành công
// test case 2: get video thất bại (kết nối database fail)
describe('getVideos', () => { // define bộ test case
    // giả lập req, res, findAll
    let req, res, findAllStub;

    // thiết lập môi trường cho testing
    beforeEach(() => {
        req = {};
        // res.status().json() => sinon để giả lập res
        res = {
            status: Sinon.stub().returnsThis(),
            json: Sinon.stub()
        };

        // giả lập function findAll của ORM => sinon
        // model.video.findAll()
        findAllStub = Sinon.stub(model.video, 'findAll');
    });

    afterEach(() => {
        // khôi phục lại findAllStub
        findAllStub.restore();
    });

    // define từng test case cụ thể
    // case 1: getVideos success
    it("getVideos successfully", async () => {
        // chuẩn bị list videos
        const mockVideos = [
            {
                "video_id": 9,
                "video_name": "Fitness Workout Routine",
                "thumbnail": "fitness_workout.jpg",
                "description": "Effective fitness workout routine",
                "views": 900,
                "source": "instagram.com",
                "user_id": 4,
                "type_id": 8
            },
            {
                "video_id": 10,
                "video_name": "Understanding Blockchain",
                "thumbnail": "blockchain_technology.jpg",
                "description": "Exploring the concepts of blockchain",
                "views": 500,
                "source": "https://www.youtube.com/watch?v=CzXWhBjtRnU",
                "user_id": 5,
                "type_id": 9
            },
            {
                "video_id": 11,
                "video_name": "Understanding Blockchain",
                "thumbnail": "blockchain_technology.jpg",
                "description": "Exploring the concepts of blockchain",
                "views": 500,
                "source": "https://www.youtube.com/watch?v=CzXWhBjtRnU",
                "user_id": 5,
                "type_id": 9
            }
        ];
        // gán list videos giả lập vào findAllStub
        // do kết quả findAll là Promise => stub dùng resolves
        findAllStub.resolves(mockVideos);

        // call function getVideos để ra happy case (list videos)
        await getVideos(req, res);

        // mong đợi status code là 200
        expect(res.status.calledOnceWith(200)).to.be.true;
    })

    // case 2: getVideo fail
    it("getVideo fail", async () => {
        // giả lập kết nối tới database thất bại
        findAllStub.rejects(new Error('Database error'));

        // call function getVideos
        await getVideos(req, res);

        // expect kết quả
        expect(res.status.calledOnceWith(500)).to.be.true;
        expect(res.json.calledOnceWith({message: "error for api get list videos"})).to.be.true
    })
})

describe("test case controller getTypes", () => {
    let req, res, findAllStub;
    beforeEach(() => {
        req = {}
        res = {
            status: Sinon.stub().returnsThis(),
            json: Sinon.stub()
        }
        findAllStub = Sinon.stub(model.video_type, "findAll");
    })

    afterEach(() => {
        findAllStub.restore();
    })

    // case 1: get list type video successfully
    it("Get list type videos successfully", async () => {
        const mockData = [
            {
                "type_id": 1,
                "type_name": "New",
                "icon": "fa-solid fa-house"
            },
            {
                "type_id": 2,
                "type_name": "Coding",
                "icon": "fa-solid fa-code"
            }
        ];
        findAllStub.resolves(mockData);
        await getTypes(req, res);

        // expect kết quả mong muốn
        expect(res.json.calledOnceWith(mockData)).to.be.true;
    })
})
