import { observable, action, makeObservable } from 'mobx'
import { getMerchantByPlatformAppId } from '@/api/merchant';
import type { MerchantInfo } from '@/api/types/merchant';

class Merchant {
  constructor () {
    makeObservable(this, {
      merchantInfo: observable,
      getMerchantInfo: action
    })
  }

  merchantInfo = {} as MerchantInfo

  async getMerchantInfo () {
    const { payload } = await getMerchantByPlatformAppId('0j5v9336');
    this.merchantInfo = payload
  }
}

export default new Merchant()
