import {defineStore} from "pinia";
import request from "~/utils/request";

export const useDoubanStore = defineStore('douban', {
    state() {
        return {
            doubanData: []
        }
    },
    actions: {
        async getDoubanData() {
            let res:any =  await request('/api?url=https://movie.douban.com/j/search_subjects?tag=%E7%83%AD%E9%97%A8',{
                method:'GET'
            })
            let res2:any =  await request('/api?url=https://movie.douban.com/j/search_subjects?type=tv&tag=热门',{
                method:'GET'
            })
            this.doubanData = res.subjects.concat(res2.subjects)
        }
    },
    persist: {
        storage: persistedState.localStorage
    },
})