type ICallback = (data: any) => void;

interface IRefs {
  callback: ICallback;
  eventName: string;
}

const refs: IRefs[] = []

export const subscribe = (eventName: string, callback: ICallback) => {
  refs.push({
    eventName,
    callback,
  })
}

export const publish = (eventName: string, data?: any) => {
  refs.forEach((item) => {
    if (item.eventName === eventName) {
      item.callback(data ?? null)
    }
  })
}