import Request from '../../src/models/request';
import { assert } from 'chai';

describe('JSON interop', () => {
  it('Deserialize happy path', () => {
    const actual = Request.parse(
      JSON.stringify({
        id: 'id',
        name: 'name',
        body: 'body'
      })
    );

    assert.equal(actual.id, 'id');
    assert.equal(actual.name, 'name');
    assert.equal(actual.body, 'body');
  });

  it('Deserialize with extra properties', () => {
    const actual = Request.parse(
      JSON.stringify({
        id: 'id',
        name: 'name',
        body: 'body',
        somethingElse: 'somethingElse'
      })
    );

    assert.equal(actual.id, 'id');
    assert.equal(actual.name, 'name');
    assert.equal(actual.body, 'body');
  });

  it('Deserialize with missing properties', () => {
    const actual = Request.parse(
      JSON.stringify({
        id: 'id',
        name: 'name'
      })
    );

    assert.equal(actual.id, 'id');
    assert.equal(actual.name, 'name');
    assert.isNull(actual.body);
  });
});
