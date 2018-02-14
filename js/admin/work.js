class Work extends React.Component {
    constructor(props) {
        super(props);
        this.handleQueryClick = this.handleQueryClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }
    handleQueryClick(e) {
        $.ajax({
            type: "post",
            url: "work/detail/ajax",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: '{"workId":"' + $(event.target).data("workid") + '"}',
            async: false,
            success: function (data) {
                ReactDOM.render(
                    <span>
                        <WorkDetail work={data.work} />
                        <WorkDetailTypeTable workTypes={data.workTypes} />
                        {
                            data.workImages.map((workImage, index) => {
                                return <WorkImage workImage={workImage} />
                            })
                        }
                    </span>,
                    document.getElementById("findresult")
                );
            },
            error: function (data) {
                console.log(data);
            }
        });
    }
    handleDeleteClick(e) {
        let form = $(`<form action="work/remove" method="post"><form>`);
        form.append(`<input type=hidden name=workId value=${$(event.target).data("workid")} />`);
        form.appendTo(document.body);
        form.submit();
        document.body.remove(form[0]);
    }
    render() {
        return (
            <tr>
                <td>{this.props.work.workId}</td>
                <td>{this.props.work.workName}</td>
                <td>
                    <button data-workid={this.props.work.workId} className='btn btn-primary btn-lg text-right' onClick={this.handleQueryClick}>作品信息</button>
                    <button data-workid={this.props.work.workId} className='btn btn-danger btn-lg text-right' onClick={this.handleDeleteClick}>删除作品</button>
                </td>
            </tr>
        );
    }
}
class WorkDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                作品名称:<div>{this.props.work.workName}</div>
                作品上传时间:<div>{this.props.work.workUploadTime}</div>
                作品pdf路径:<div><a href={this.props.work.workPdfpath} download={this.props.work.workName}>{this.props.work.workPdfpath}</a></div>
            </div>
        );
    }
}
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        let page = $(e.target).text();
        if (isNaN(page)) {
            return;
        }
        let ajaxOpt = {
            type: "post",
            url: "work/ajax",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: handleData,
        };
        ajaxOpt.data = '{"workName":"' + $("#text").val() + '","page":"' + page + '"}';
        $.ajax(ajaxOpt);
    }

    render() {
        return (
            <div id="pages" onClick={this.handleClick}>
                {
                    this.props.nowPage - 1 > 0 && <a href="javascript:void(0)">{this.props.nowPage - 1}</a>
                }
                <span>{this.props.nowPage}</span>
                {
                    this.props.nowPage + 1 <= this.props.totalPage && <a href="javascript:void(0)">{this.props.nowPage + 1}</a>
                }
            </div>
        );
    }
}
class WorkDetailTypeTable extends React.Component {
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <td>类型</td>
                        <td>库存</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.workTypes.map((workType, index) => {
                            return <WorkDetailTypeTableItem workType={workType} />
                        })
                    }
                </tbody>
            </table>
        );
    }
}
class WorkDetailTypeTableItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleModifyStock = this.handleModifyStock.bind(this);
    }

    handleModifyStock(e) {
        let form = $(`<form action="worktype/modifystock" method="post"></form>`);
        let workTypeId = $(e.target).data("worktypeid");
        form.append(`<input type=hidden name=workTypeId value=${workTypeId} />`);
        let stock = prompt("要改成多少库存?");
        if (stock === null)
            return;
        if (!isNaN(stock) && stock >= 0) {
            form.append(`<input type=hidden name=stock value=${stock} />`);
            form.appendTo(document.body);
            form.submit();
            document.body.remove(form[0]);
        } else {
            alert("输入的库存数字不合法");
        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.workType.name}</td>
                <td>{this.props.workType.stock}</td>
                <td><button data-worktypeid={this.props.workType.workTypeId} className="modifystock btn btn-primary" onClick={this.handleModifyStock}>修改库存</button></td>
            </tr>
        );
    }
}
class WorkImage extends React.Component {
    render() {
        return (
            <img style={{ width: "70%" }} src={this.props.workImage.workImagePath} />
        );
    }
}
class WorkTable extends React.Component {
    render() {
        return (
            <span>
                <table id="workTable" className="table">
                    <thead>
                        <tr>
                            <th>作品ID</th>
                            <th>作品名称</th>
                            <th><button id="addfun" className="btn btn-info btn-lg text-right">添加作品</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.works.map((work, index) => {
                                return <Work work={work} />
                            })
                        }
                    </tbody>
                </table>
                <Page nowPage={this.props.nowPage} totalPage={this.props.totalPage} />
            </span>
        );
    }
}
function handleData(data) {
    if (data.errInfo) {
        $(".table tbody").empty();
        $(".table").append(data.errInfo);
        return;
    }
    ReactDOM.render(
        <WorkTable works={data.result} nowPage={data.nowPage} totalPage={data.totalPage} />,
        document.getElementById("findresult")
    );
    $("#text").val(data.workName);
}