/**
 * Created by liaohui1080 on 2017/3/17.
 */
import React, {Component} from 'react';


class NumberAnimat extends Component {

    constructor(props) {
        super(props);//实现父类的构造函数

        //-------------控件 事件 和初始化------------------------------
        this.state = {
            number: 0,
            
        };

        this.number=parseInt(this.props.number)
    }

    componentDidMount(){
        var self=this;

 //设置步长
 var step=1; 
 var numberLength=self.number.toString().length; //获取数字位数
 
 //根据不同位数 给不同的 步长
 switch(numberLength){
  
     case 4:
     step=10

     break;


     case 5:
     step=100

     break;


     case 6:
     step=1000

     break;

     default:
  
     step=1

     break;

 }


        let numberStart=setInterval(function(){
        
           
            //每次循环 加步长
            let abc =self.state.number+step
           
            
            if(abc<=self.number){

                //设置
                self.setState({number: abc});
                
            }else{

                //如果最后循环的 数 小于 总数的话, 直接把总数赋值给循环数
                if(self.state.number<self.number){

                    
                    self.setState({number: self.number});
                }
              
                clearInterval(numberStart)
            }

            
        },1)

        
    }

    render() {

        let state=this.state

        

        return (

            
                <span>{state.number}</span>
       

        )


    }


}

export default NumberAnimat