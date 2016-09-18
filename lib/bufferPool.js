/**
 * Created by tteogi on 2016-04-12.
 */

'use strict'

let _bufferPool = new Map()
let _maxPoolItem = 10

class BufferPool {
    static getBuffer(size) {
        var pool = _bufferPool.get(size)
        if( pool )
        {
            if( pool.length > 0 )
                return pool.pop();
        }
        return new Buffer(size)
    }

    static retrieveBuffer(buffer) {
        var pool = _bufferPool.get(buffer.length)
        if (pool == null) {
            pool = []
            _bufferPool.set(buffer.length, pool)
        }
        if (pool.length < _maxPoolItem)
            pool.push(buffer)
    }
}

function CreateBufferPool(maxPool) {
    if(maxPool)
        _maxPoolItem = maxPool
   return BufferPool
}

exports.BufferPool = CreateBufferPool
