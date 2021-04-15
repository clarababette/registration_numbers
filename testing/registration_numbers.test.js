
var regList=[];
var testFilter = regNumFilter();
describe('Testing the Registration Number factory functions' , function(){
    it('should convert an input string to an array' , function(){
        var str = 'ca 342 234'
        assert.deepEqual(testFilter.inputToList(str),['CA 342 234']);
        str = 'ca 324456,cj345123,ck139057'
        assert.deepEqual(testFilter.inputToList(str),['CA 324 456','CJ 345 123','CK 139 057']);
        
    });
    it('should add new registration numbers to the list' , function(){
        regList = ['CA 324 456','CJ 345 123','CK 139 057']
        
        testFilter.addToList('CA 994 405');
        assert.deepEqual(regList,['CA 994 405','CA 324 456','CJ 345 123','CK 139 057']);
    });
    it('should add spaces to registration numbers that are valid but missing spaces' , function(){
        var str = 'CA345247'
        assert.equal(testFilter.spaceCheck(str),'CA 345 247');
        str = 'CJ 32 5207'
        assert.equal(testFilter.spaceCheck(str),'CJ 325 207');
        str = 'C Y 3 8 5 2 47'
        assert.equal(testFilter.spaceCheck(str),'CY 385 247');
        str = 'CAA 32 5207'
        assert.equal(testFilter.spaceCheck(str),'CAA 325 207');
        str = 'C AA 3 8 5 2 47'
        assert.equal(testFilter.spaceCheck(str),'CAA 385 247');
    });
    it('should check if a registration is valid' , function(){
        assert.equal(testFilter.validityTest('CY 345 973'), true);
        assert.equal(testFilter.validityTest('trousers'), false);
        assert.equal(testFilter.validityTest('CS 345 973'), false);
    });
    it('should check if a registration is not a duplicate' , function(){
        regList = ['CA 324 456','CJ 345 123','CK 139 057']
        assert.equal(testFilter.validityTest('CK 445 973'), true);
        assert.equal(testFilter.validityTest('CA 324 456'), false);
    });
    it('should return a list of only the cars from a specific town.', function(){
        regList = ['CA 324 456','CJ 345 123','CK 139 057']
        assert.deepEqual(testFilter.carsForTown('Cape Town'),['CA 324 456']);
        assert.deepEqual(testFilter.carsForTown('Paarl'),['CJ 345 123']);
        assert.deepEqual(testFilter.carsForTown('Malmesbury'),['CK 139 057']);
        assert.deepEqual(testFilter.carsForTown('Bellville'),[]);
    });
});