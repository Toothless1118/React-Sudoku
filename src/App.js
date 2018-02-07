import React from 'react';
import { render } from 'react-dom';
import './App.css';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      drawFlag: false,                                // component render flag when change state
      inputCheckingDummyData: [                       // user input state table when click validate button
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '']
      ],
    };

    this.checkedData = [];          //  user input value table
    this.backupData = [];           //  random value table
    this.initVariables();           //  init variables function
  }
  
  initVariables() {

    this.checkedData = [
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '']
    ];

    this.backupData = [];

  }
  
  // get random value from array
  getRadomValue(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
  }

  // remove element from array 
  removeValueArray(array, element) {
    array = array.filter(e => e !== element);
    return array;
  }

  // get possible random value for next element with created dummy data 
  checkBeforeValue(data, row, col) {
    let pattern = [1, 2, 3, 4, 5 ,6 ,7 ,8, 9];

    // row
    if (row == 0 && col == 0) {
      let number = this.getRadomValue(pattern);
      return number;
    }
    
    // col
    for (let i = 0; i < col; i ++) {
        if (data[row][i] != '') {
          pattern = this.removeValueArray(pattern, data[row][i]);
        }
    }
    
    // neighbour
    for (let i = 0; i < row; i ++) {
      if (data[i][col] != '') {
        pattern = this.removeValueArray(pattern, data[i][col]);
      }
    }

    let colIndex = parseInt(col / 3);
    let rowIndex = parseInt(row / 3);
    
    for (let i = rowIndex * 3; i < rowIndex * 3 + 3 ; i ++) {
      for (let j = colIndex * 3; j < colIndex * 3 + 3 ; j ++) {
        if (data[i][j] != '') {
          pattern = this.removeValueArray(pattern, data[i][j]);
        }
      }
    }
    let number = this.getRadomValue(pattern);
    
    return number;
  }

  // create data for random table
  getInitialRandomData() {
    const dummyData = [
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '']
    ];
    
    let data = [];
    let cols = [], rows=[];
   
    for (let row = 0; row < 9; row ++) {
      for (let col = 0; col < 9; col ++) {
        let showed = Math.floor(Math.random() * 2);
        // let number = this.getRadomValue();

        if (showed == 1) {
          let number = this.checkBeforeValue(dummyData, row, col);
          cols.push(number);
          dummyData[row][col] = number;
        }
        else {
          cols.push('');
        }
      }
      data.push(cols);
      cols = [];
    }
    return data;
  }

  // change state when fill input text in
  setInputValue(event, row, col) {
    let {inputCheckingDummyData} = this.state;
    this.backupData[row][col] = event.target.value;

    inputCheckingDummyData[row][col] = event.target.value;

    this.setState({drawFlag: true});
    this.setState({inputCheckingDummyData: inputCheckingDummyData});
  }

  // create initial sudoku table
  generateRows() {
      let cols = [0, 1, 2, 3, 4, 5 ,6 ,7 ,8];
      this.backupData = this.getInitialRandomData();
      
      return this.backupData.map((item, i)=>{
          // handle the column data within each row
          let cells = cols.map((colData, j) => {
              if (item[colData] == '')
                return <div className="cellStyle" key={j}>
                          <input 
                                className="inputStyle"
                                type="text" 
                                value={this.state.inputCheckingDummyData[i][j]}
                                onChange={(e)=>this.setInputValue(e, i, j)} 
                          />
                        </div>;
              else
                return <div className="cellStyle" key={j}>{item[colData]}</div>;
          });
          return <div className="rowStyle" key={i}>{cells}</div>;
      });
  }

  // create sudoku table when click validate button
  regenerateRows() {
    let cols = [0, 1, 2, 3, 4, 5 ,6 ,7 ,8];
    
    return this.backupData.map((item, i)=>{
        // handle the column data within each row
        let cells = cols.map((colData, j) => {
            if (item[colData] == '') {
              return <div className="cellStyle" key={j}>
                        <input 
                              className="inputStyle"
                              type="text" 
                              value={this.state.inputCheckingDummyData[i][j]}
                              onChange={(e)=>this.setInputValue(e, i, j)} 
                        />
                      </div>;
            } else {
              if (this.checkedData[i][j]) {
                if (this.state.inputCheckingDummyData[i][j] != '')
                  return <div className="cellStyle" key={j}>
                          <input 
                                className="inputSelectedStyle"
                                type="text" 
                                value={this.state.inputCheckingDummyData[i][j]}
                                onChange={(e)=>this.setInputValue(e, i, j)} 
                          />
                        </div>;
                else
                  return <div className="selectedCellStyle" key={j}>{item[colData]}</div>;
              } else {
                if (this.state.inputCheckingDummyData[i][j] != '')
                  return <div className="cellStyle" key={j}>
                            <input 
                                  className="inputStyle"
                                  type="text" 
                                  value={this.state.inputCheckingDummyData[i][j]}
                                  onChange={(e)=>this.setInputValue(e, i, j)} 
                            />
                          </div>;
                else
                  return <div className="cellStyle" key={j}>{item[colData]}</div>;
              }
            }
        });
        return <div className="rowStyle" key={i}>{cells}</div>;
    });
  }

  // check Duplicated value and save them to the "checkedData" global
  checkDuplicatedValue(data, value, row, col) {
    for (let i = 0; i < 9; i ++) { 
      if (data[row][i] == value && i != col) {
        this.checkedData[row][i] = true;
       }
    }
    
    for (let i = 0; i < 9; i ++) {
      if (data[i][col] == value && i != row) {
        this.checkedData[i][col] = true;
      }
    }

    let colIndex = parseInt(col / 3);
    let rowIndex = parseInt(row / 3);
    
    for (let i = rowIndex * 3; i < rowIndex * 3 + 3 ; i ++) {
      for (let j = colIndex * 3; j < colIndex * 3 + 3 ; j ++) {
        if (data[i][j] == value && i != row && j != col ) {
           this.checkedData[i][j] = true;
        }
      }
    }
    
  }

  // event when click validate button
  validateValue() {
    this.checkedData = [
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '']
    ];

    for (let i = 0; i < 9; i ++) {
      for (let j = 0; j < 9; j ++) {
        if (this.backupData[i][j] != '') {
          let value = this.backupData[i][j];
          this.checkDuplicatedValue(this.backupData, value, i, j);
        }  
      }
    }
    
    this.setState({drawFlag: true});
  }

  // event for "New Puzzle Button" 
  newPuzzle() {
    this.initVariables();

    let inputCheckingDummyData = [
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '']
    ];

    this.setState({inputCheckingDummyData: inputCheckingDummyData});
    this.setState({drawFlag: false});
  }

  render(){
    let rowComponents;
    if (this.state.drawFlag)
      rowComponents = this.regenerateRows();
    else
      rowComponents = this.generateRows();
    

    return (
      <div className="wrapper">
        <div className="title">David's Sudoku</div>
        <div>
          { rowComponents }
        </div>
        
        <button className="button" onClick={()=>this.validateValue()} >Validate</button>
        <button className="button" onClick={()=>this.newPuzzle()} >New Puzzle</button>
      </div>
    );
  }
}

