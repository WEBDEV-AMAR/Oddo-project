import PouchDB from 'pouchdb-browser';

const swapDB = new PouchDB('swap_requests');

export default swapDB;
