import { isNull, isUndefined } from 'lodash-es';

export interface CacheEntity<T> {
  value: T;
  start: number;
  expire: number;
}

type Key = string;

/**
 * 设置普通KV
 * @param key
 * @param value
 */
export function setValue<T>(key: Key, value: CacheEntity<T>) {
  if (isNull(value) || isUndefined(value)) {
    localStorage.setItem(key, '');
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * 获取普通KV
 * @param key
 * @returns {any}
 */
export function getValue<T>(key: Key): CacheEntity<T> | undefined {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value) as CacheEntity<T>;
  }
}

/**
 * 设置具有有效期的KV，默认有效期为1周
 * @param key
 * @param value
 * @param expire
 */
export function setAliveValue<T>(key: Key, value: CacheEntity<T>, expire = 7 * 24 * 60 * 60 * 1000) {
  setValue(key, {
    value,
    start: Date.now().valueOf(),
    expire,
  });
}

/**
 * token 是否有效
 * @returns {boolean}
 */
export function isExpire<T>(key: Key): { isExpire: boolean; value: CacheEntity<T> | undefined } {
  const value = getValue<T>(key);

  let isExpire = true;

  if (value && Date.now().valueOf() - value.start < value.expire) {
    isExpire = false;
  }

  return { isExpire, value };
}

/**
 * 清除key
 */
export function removeValue(key: Key) {
  localStorage.removeItem(key);
}

/**
 * 清除所有key
 */
export function clearValue() {
  localStorage.clear();
}
