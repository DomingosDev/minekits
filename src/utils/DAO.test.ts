import {DAO} from './DAO'

describe("Data Access Object Tests", ()=>{
    const dao = new DAO;
    const newItem = { name: 'New Item'};
    const item = { id:2, name: 'Old Item'};

    dao.table('test');
    test('This should save an new object to localStorage', () => {
        dao.save( Object.assign({}, newItem) );

        let newItemWithId = Object.assign({id:1}, newItem); 
        let itemFromLocalStorage = JSON.parse( localStorage.getItem('test') || '[]' ).shift();

        expect(itemFromLocalStorage).toMatchObject(newItemWithId);
    });

    test('this should auto-increment new object id', () => {
        dao.save( Object.assign({}, newItem) );
        let itemsFromLocalStorage = JSON.parse( localStorage.getItem('test') || '[]' );
        expect(itemsFromLocalStorage[0].id.toString()).toMatch('1');
        expect(itemsFromLocalStorage[1].id.toString()).toMatch('2');
    })

    test('this should retrieve data from localstorage', () => {
        let all = dao.all()
        expect( all.length.toString() ).toMatch('2');
        expect( all.shift() ).toMatchObject( {id:1, name: 'New Item'} );
        expect( all.shift() ).toMatchObject( {id:2, name: 'New Item'} );
    })

    test('this should retrieve filtered data', () => {
        let rows = dao.where('id = 1').all();
        expect( rows.length.toString() ).toMatch('1');
        expect( rows.shift() ).toMatchObject( {id:1, name: 'New Item'})

        rows = dao.where('id != 1').all();
        expect( rows.length.toString() ).toMatch('1');
        expect( rows.shift() ).toMatchObject( {id:2, name: 'New Item'})
    })

    test('this should update an object data', () => {
        dao.save({id:2, name:'I\'m the first!'});
        expect( dao.where('id = 2').one() ).toMatchObject( {id:2, name:'I\'m the first!'} )
        expect( dao.where('id = 2').and('name = New Item').all().length.toString() ).toMatch('0')
    })
  })