require("assert");

const expect=require("chai").expect;




describe('Users Test',()=>{

    it('should return hello world', () => {
       
        expect('Hello World!').to.equal('Hello World!');
      
    });

    it('should return hello', () => {
       
        expect('Hello!').to.equal('Hello!');
      
    });
    
})
