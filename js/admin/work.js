class Work extends React.Component {
    constructor(props) {
        super(props);
        this.handleQueryClick = this.handleQueryClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }
    handleQueryClick() {
        $.ajax({
            type: "post",
            url: "work/detail/ajax",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                workId: this.props.work.workId
            }),
            async: false,
            success: (data) => {
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
            error: (data) => {
                console.log(data);
            }
        });
    }
    handleDeleteClick() {
        let form = $(`<form action="work/remove" method="post"><form>`);
        form.append(`<input type=hidden name=workId value=${this.props.work.workId} />`);
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
                    <button className='btn btn-primary btn-lg text-right' onClick={this.handleQueryClick}>作品信息</button>
                    <button className='btn btn-danger btn-lg text-right' onClick={this.handleDeleteClick}>删除作品</button>
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
        this.pageRequest(page, $("#text").val());
    }

    pageRequest(page, workName) {
        $.ajax({
            type: "post",
            url: "work/ajax",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ workName, page }),
            success: handleData,
        });
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

    handleModifyStock() {
        let form = $(`<form action="worktype/modifystock" method="post"></form>`);
        form.append(`<input type=hidden name=workTypeId value=${this.props.workType.workTypeId} />`);
        let stock = prompt("要改成多少库存?");
        if (stock === null)
            return;
        else if (!isNaN(stock) && stock >= 0) {
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
    constructor(props) {
        super(props);
        this.state = { createWorkToggle: false };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            createWorkToggle: !prevState.createWorkToggle
        }));
    }

    render() {
        if (this.state.createWorkToggle) {
            return (<span>
                <table id="workTable" className="table">
                    <thead>
                        <tr>
                            <th>作品ID</th>
                            <th>作品名称</th>
                            <th><button id="addfun" onClick={this.handleClick} className="btn btn-info btn-lg text-right">{this.state.createWorkToggle ? "关闭" : "创建作品"}</button></th>
                        </tr>
                    </thead>
                </table>
                <CreateWork />
            </span>);
            return <CreateWork />;
        } else {
            return (
                <span>
                    <table id="workTable" className="table">
                        <thead>
                            <tr>
                                <th>作品ID</th>
                                <th>作品名称</th>
                                <th><button id="addfun" onClick={this.handleClick} className="btn btn-info btn-lg text-right">{this.state.createWorkToggle ? "关闭" : "创建作品"}</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.works.map((work, index) => {
                                    return <Work work={work} />
                                })
                            }
                        </tbody>
                        <Page nowPage={this.props.nowPage} totalPage={this.props.totalPage} />
                    </table>
                </span>
            );
        }
    }
}
//Todo:Toggle时隐藏Table元素
class CreateWork extends React.Component {
    constructor(props) {
        super(props);
        this.addImage = this.addImage.bind(this);
    }
    render() {
        return (
            <div id="addwork">
                <form method="post" enctype="multipart/form-data" class="form" action="/work/add">
                    作品名称:<input type="text" name="workName" /><br /> 作品库存:
				<input type="number" name="workStock" /> <br /> 作品pdf文件路径:
				<input type="text" name="workPdfpath" /><br /> 作品封面图片:
				<input type="file" accept="image/*" name="coverFile" /><br /> 作品概要:
				<input type="text" name="workSummary" /><br /> 作品图片:
				<div id="imageFilesDiv">
                        <input type="file" accept="image/*" name="imageFiles" /><br />
                    </div>
                    <button id="addImageFile" onClick={this.addImage} type="button">增加图片</button><br />
                    <input type="submit" class="btn btn-info btn-lg" value="确认添加" />
                </form>
            </div>
        );
    }
    addImage(e) {
        e.preventDefault();
        let str = `<input type="file" accept="image/*" name="imageFiles" /><br/>`;
        $("#imageFilesDiv").append(str);
    }

}