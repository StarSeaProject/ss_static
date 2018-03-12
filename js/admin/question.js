// class QuestionTable extends React.Component{
//     render(){
//         return(
//             <table id="questions" class="table">
//                 <thead>
//                 <tr>
//                     <th>问题内容</th>
//                     <th>问题提出时间</th>
//                     <th>问题状态</th>
//                     <th>操作</th>
//                 </tr>
//                 </thead>
//                 <tbody></tbody>
//             </table>
//         )
//     }


// }
// class Page extends React.Component{
//     constructor(props){
//         super(props);
//         this.handleClick = this.handleClick.bind(this);
//         let page = 1;
//         let ajaxOpt = {
//             type: "post",
//             url: "question/ajax",
//             contentType: "application/json;charset=utf-8",
//             dataType: "json",
//             data: '{"questionStatus":"' + $("#questionStatus").val() + '","page":"' + page + '"}',
//             async: false,
//             success: handleData,
//         };
//         $.ajax(ajaxOpt);
//     }
//     handleClick(e){
//         if (isNaN($(event.target).text())) {
//             return;
//         }
//         page = $(event.target).text();
//         // ajaxOpt.data = '{"questionStatus":"' + $("#questionStatus").val() + '","page":"' + page + '"}';
//         ajaxOpt.data = JSON.stringify({
//             questionStatus:$("#questionStatus").val(),
//             page
//         })
//         $.ajax(ajaxOpt);
//     }
//     render() {
//         return (
//             <div id="pages" onClick={this.handleClick}>
//                 {
//                     this.props.nowPage - 1 > 0 && <a href="javascript:void(0)">{this.props.nowPage - 1}</a>
//                 }
//                 <span>{this.props.nowPage}</span>
//                 {
//                     this.props.nowPage + 1 <= this.props.totalPage && <a href="javascript:void(0)">{this.props.nowPage + 1}</a>
//                 }
//             </div>
//         );
//     }
// }
// class Question extends React.Component{
//     constructor(props) {
//         super(props);
//         this.handleQueryClick = this.handleQueryClick.bind(this);
//     }
//     handleQueryClick(){
//         $.ajax({
//             type: "post",
//             url: "question/ajax",
//             contentType: "application/json;charset=utf-8",
//             dataType: "json",
//             data: JSON.stringify({
//                 questionStatus: this.props.questionStatus
//             }),
//             async: false,
//             success: (data) => {
//                 ReactDOM.render(
//                     <div>
//                         <div class="row qaBox">
//                             <div class="col-sm-12 col-md-10 qBox">
//                                 <p class="qText">
//                                     Q:${data.question}
//                                 </p>
//                             </div>
//                             <div class="col-sm-12 col-md-10 aBox">
//                                 <p class="aText">
//                                     A:${data.answer}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>,
//                     document.getElementById("findresult")
//                 );
//             },
//             error: (data) => {
//                 console.log(data);
//             }
//         });
//     }
// }

class Question extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="container">
                <QuestionOption />
                <QuestionTable />
                <Page />
        </div>
        )
    }
}

class QuestionOption extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <div className="row container form">
                    <select id="questionStatus">
                        <option value="">请选择问题状态</option>
                        <option value="1">未回答</option>
                        <option value="2">已回答</option>
                    </select>
                <button id="questionquery" className="btn btn-info btn-lg text-right">查询</button>
             </div>
        )
    }
}

class QuestionTable extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="row container">
                <table id="questions" className="table">
                    <thead>
                        <tr>
                            <th>问题内容</th>
                            <th>问题提出时间</th>
                            <th>问题状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <QuestionTableThread />
                    </tbody>
                </table>
                <div id="pages"></div>
            </div>
        )
    }
}

class QuestionTableThread extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <tr>
                <td>{this.props.question}</td>
                <td>{this.props.createTime}</td>
                <td className={this.props.questionId}>{this.props.questionStatus}</td>
                {
                    this.props.questionStatus == "未回答" &&
                        <td>
                            <button data-questionid={this.props.questionId} class="answer btn btn-primary btn-lg text-right" id={this.props.questionId}>回答</button>
                        </td>
                }
            </tr>
        )
    }
}


class Page extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div id="pages" onClick={this.handleClick}>
                {
                    this.props.nowPage - 1 > 0 && <a href="javascript:void(0)">{this.props.nowPage - 1}</a>
                }
                <span>{this.props.nowPage}</span>
                {
                    this.props.nowPage + 1 <= this.props.totalPage && <a href="javascript:void(0)">{this.props.nowPage + 1}</a>
                }
            </div>
        )
    }
}