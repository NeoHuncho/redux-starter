//to get the coverage folder run ./node_modules/.bin/jest --coverage
//check out the index.html file. you can see the different places where the app has been tested


import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

import {loadBugs, addBug,resolveBug,getUnresolvedBugs} from '../bugs';
import {apiCallBegan} from '../api';

import configureStore from '../configureStore'


describe('bugsSlice', () => {
        
        //this block is setting global variables for the following test
        let fakeAxios;
        let store;
        
        beforeEach(() =>{
            fakeAxios= new MockAdapter(axios);
            store= configureStore();
        
        })

        const bugsSlice =()=> store.getState().entities.bugs;
        const createState = ()=>({//we use a function here so each test can get a clean mock state
            
            entities:{
                bugs:{
                     list:[]
                 }
            }

        });
        
        describe(("loading bugs"), () =>{
            describe("if the bugs exist in the cache", () =>{
                it('they should not be fetched by the server again ', async() => {
                    fakeAxios.onGet("/bugs").reply(200, [{id:1}]);
                    
                    await store.dispatch(loadBugs());
                    await store.dispatch(loadBugs());

                    expect(fakeAxios.history.get.length).toBe(1);//has fakeAxios received a get request
                });
            })
            
            describe("if the bugs don't exist in the cache", () =>{
                it('they should be fetched from the server and put in the store', async () => {
                    fakeAxios.onGet("/bugs").reply(200, [{id:1}]);

                    await store.dispatch(loadBugs());

                    expect(bugsSlice().list).toHaveLength(1);
                });
                
                describe("loading indicator", () =>{
                
                    it("should be true while loading the bugs", ()=>{

                       fakeAxios.onGet("/bugs").reply(() =>{

                           expect(bugsSlice().loading).toBe(true);
                           return[200,[{id:1}]];
                       })

                        store.dispatch(loadBugs());
                   }) 
                
                    it("should be false when the bugs are fetched", async()=>{

                       fakeAxios.onGet("/bugs").reply(200,[{id:1}]);

                        await store.dispatch(loadBugs());

                        expect(bugsSlice().loading).toBe(false)
                   }) 
                
                    it("should be true while loading the bugs", ()=>{

                       fakeAxios.onGet("/bugs").reply(() =>{//this reply is written differently as
                        //it alows to test without having to wait for the store.dispatch

                           expect(bugsSlice().loading).toBe(true);
                           return[200,[{id:1}]];
                       })

                        store.dispatch(loadBugs());
                   }) 
                   
                   it("should be true while loading the bugs", ()=>{

                   }) 
                
                })
            })
        })
      
    //*every bug runs in isolation. Changes made to the state in one test will not affect the state of another test  
        
    //this is an example of a social test
    it('should add the bug to the store if its saved in the server',async () => {
         //* to write clean test you should follow these steps- arrange-act-assert  
        //Arrange
        const bug= {description:'av'};
        const savedBug = {...bug,id:1}
        fakeAxios.onPost('/bugs').reply(200,savedBug)//here this fakeaxios is overiding the real one to always give back savedBugs. this makes testing faster and more reliable
       
        //act
        await store.dispatch(addBug(bug));

        //assert
        expect(bugsSlice().list).toContainEqual(savedBug);

    });
    
    it('should not add the bug to the store if its not saved in the server',async () => {
        //Arrange
        const bug= {description:'a'};
        fakeAxios.onPost('/bugs').reply(500)
       
        //act
        await store.dispatch(addBug(bug));

        //assert
        expect(bugsSlice().list).toHaveLength(0);

    });

    it("should mark the bug as resolved if it's saved to the server" , async () => {

       //Arrange
       const id= 1;

       fakeAxios.onPost("/bugs").reply(200,{id:id})// as all test are in isolation we need to create a bug before resolivng it
       fakeAxios.onPatch('/bugs/'+id).reply(200,{id:id,  resolved:true});
      
       //act
       await store.dispatch(addBug({}))// as all test are in isolation we need to create a bug before resolivng it
       await store.dispatch(resolveBug(id));

       //assert
       expect(bugsSlice().list[0].resolved).toBe(true);

   });

   it("should not mark the bug as resolved if it's not saved to the server" , async () => {

       //Arrange
       const id= 1;
       
       fakeAxios.onPost("/bugs").reply(200,{id:id})// as all test are in isolation we need to create a bug before resolivng it
       fakeAxios.onPatch('/bugs/'+id).reply(500);
      
       //act
       await store.dispatch(addBug({}))// as all test are in isolation we need to create a bug before resolivng it
       await store.dispatch(resolveBug(id));

       //assert
       expect(bugsSlice().list[0].resolved).not.toBe(true);

   });

   it("should mark the bug as resolved if it's saved to the server" , async () => {

    //Arrange
    const id= 1;

    fakeAxios.onPost("/bugs").reply(200,{id:id})// as all test are in isolation we need to create a bug before resolivng it
    fakeAxios.onPatch('/bugs/'+id).reply(200,{id:id,  resolved:true});
   
    //act
    await store.dispatch(addBug({}))// as all test are in isolation we need to create a bug before resolivng it
    await store.dispatch(resolveBug(id));

    //assert
    expect(bugsSlice().list[0].resolved).toBe(true);

});

    describe("selectors", ()=>{
        it('getUnresolvedbugs ', () => {
       
        const state= createState();
        state.entities.bugs.list= [
            {id:1, resolved:true},
            {id:2, },
            {id:3, }
            ]

         const result=  getUnresolvedBugs(state)
            
         expect(result).toHaveLength(2);
        });
    })

    
    //this is an example of a solitary test
    describe('action creators', () => {
        it('addBug ', () => {
        const bug ={description:'a'};
        const result=addBug(bug);
        const expected={
            type: apiCallBegan.type,
            payload:{
                url:'/bugs',
                method:'post',
                data:bug,
                onSuccess:'bugs/bugAdded'
                
            }
        };
        expect(result).toEqual(expected);
        });
    });
});