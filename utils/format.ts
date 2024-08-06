interface Link {
  service: string,
  link: string
}

interface TransformedItem {
  name: string,
  links: Link[],
  answer?: string
}

interface TransformedResult {
  list: TransformedItem[]
}

export const formatDriveLink = (list: Array<any>) => {
  const transformedList: TransformedItem[] = list.map(item => {
    const urlRegex = /https?:\/\/[^\s]+/g;
    const codeRegex = /提取码[:：]\s*([a-zA-Z0-9]+)/;

    const itemArr: Array<any> = item.answer.split('\n');

    const links: Link[] = itemArr.map(answer => {
        const urls = answer.match(urlRegex);
        const url = urls ? urls[0] : null;

        const codeMatch = answer.match(codeRegex);
        const code = codeMatch ? codeMatch[1] : null;

        let service = '';
        if (url) {
            if (url.includes('pan.baidu.com')) {
                service = 'BAIDU';
            } else if (url.includes('pan.xunlei.com')) {
                service = 'XUNLEI';
            } else if (url.includes('pan.quark.cn')) {
                service = 'QUARK';
            } else if (url.includes('www.aliyundrive.com')) {
                service = 'ALIYUN'
            } else {
                service = 'OTHER';
            }
        }

        return {
            pwd: code,
            link: url,
            service
        };
        }).filter(link => link.link); // 过滤掉没有链接的项

        return {
            name: item.question,
            links
        };
    });

    const transformedResult: TransformedResult = { list: transformedList };

    return transformedResult;
}