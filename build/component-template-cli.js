/**
 * 用于快速生成组件开发模板的命令行工具
 * @2019-4-8
 */
const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer');
const chalk = require('chalk')
const ora = require('ora')
const logSymbols = require('log-symbols');

/**
* 生成Vue组件默认内容
* @param {*} name
* @returns
*/
function createVueDefaultContent(name, className) {
return(
`<template>
    <div class="${className}"></div>
</template>

<script>
export default {
    name: '${name}',
    props: {
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style lang="less">
    .${className} {

    }
</style>
`        
)
}

// 默认选项
const defaulePromptList = [
    {
        type: 'input',
        message: '设置组件名称(例如：y-viewer):',
        name: 'folerName',
        validate(val){
           if(val === '') {
               return '请输入组件名称'
           }
           return true
       }
    },
    {
        type: 'input',
        message: '设置版本号(例如：0.0.1):',
        name: 'version',
        validate(val) {
            if(!/^\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(val)) {
                return '不合规范的版本号：'+val
            }
            return true
        },
        default: '0.0.1',
    },
    {
        type: 'list',
        message: '选择入口文件',
        name: 'main',
        choices: [
           'index.js',
        ],
        default: 0
    },
    {
        type: 'input',
        message: '组件描述',
        name: 'description'
    },
    {
        type: 'confirm',
        message: '是否生成readme文件',
        name: 'isCreateReadme',
    },
]
const warnPromptList = [
    {
        type: 'input',
        message: '设置新的组件名称',
        name: 'folerName',
        suffix: '(例如：y-viewer)'
    },
]

/**
* 首字母大写
* @param {string} [first, ...rest]
* @returns {string}
*/
function firstUpperCase([first, ...rest]) {
   return first ? first.toUpperCase() + rest.join('') : ''
}
/**
* keba格式字符串转化为大驼峰
* @param {string} str
* @returns {string}
*/
function getPascalCase(str) {
   let camelCaseStr = str.replace( /-([a-z])/g, function( all, i ){
       return i.toUpperCase()
   })
   return firstUpperCase(camelCaseStr)  
}

/**
* 创建文件夹及内容
* @param {*} folderPath // 文件夹路由
* @param {*} [subFiles=[]] // 子文件（可以是文件夹，也可以是文件）
* @returns {array}
*/
function createFolder(folderPath, subFiles = []) {
   try {
       if(!fs.existsSync(folderPath)) {
           fs.mkdirSync(folderPath)
           if(!subFiles.length) {
               return [Promise.resolve(true)]
           }
           // 写入子文件 
           const fileArr = subFiles.map(sub => {
           if(sub.type === 'folder') {
                 return createFolder(`${folderPath}/${sub.name}`)[0]
             } else {
                 return createFile(`${folderPath}/${sub.name}`, sub.content || '')
             }
           })
           return fileArr
       }
   } catch (err) {
       return [Promise.reject(err)]
   }
}

/**
* 创建并写入文件
* @param {string} ptah
* @param {string} [content='']
* @returns {promise}
*/
function createFile(ptah, content = '') {
 return new Promise((resolve, reject) => {
     // 流的方式写入文件
     const wstream = fs.createWriteStream(ptah)
     wstream.on('open', () => {
         if(content) {
             wstream.write(content)
         }
         wstream.end();
     })
     wstream.on('error', (err) => {
         reject(err)
     })
     wstream.on('close', () => {
        resolve(true) 
     })
 })
}

/**
 * 生成组件开发模板
 * @param {*} options
 */
const createComponentTemplate = function (options) {
   const spinner = ora('创建文件')
   spinner.start();
    // 生成目标文件夹路径
    const targetFolerPath = path.resolve(__dirname, '../src/components', options.folerName.replace('y-', ''))
    // 检查目标文件夹是否已存在
    fs.access(targetFolerPath, fs.constants.F_OK, (isExist) => {
        if(!isExist) {
            // 目标文件夹已经存在，重新设置组件名称
            spinner.stop();
            console.log(logSymbols.warning, chalk.yellow('组件名称重复，重新设置组件名称'))
            setComponentTemplate(warnPromptList, options)
        } else {
            // 创建文件夹
            fs.mkdir(targetFolerPath, (err) => {
                if(err) {
                    spinner.stop();
                    console.log(logSymbols.error, chalk.red('创建失败，失败原因：'+ '\n'+err))
                } else {
                   // package.json文件内容
                   const packageContext = {
                       name: options.folerName,
                       version: options.version,
                       main: options.main,
                       description: options.description
                   }
                   // 把kebab case的文件名变成大驼峰规范
                   let pascalCaseFolerName = getPascalCase(options.folerName)
                   const mainContent = `import ${pascalCaseFolerName} from \'./src/${options.folerName}.vue\';\nexport default ${pascalCaseFolerName};`
                   // 生成src目录配置
                   const srcFlolerPath = targetFolerPath+'/src'
                   const srcSubFiles = [
                       {
                           name: `index.vue`,
                           type: 'file',
                           content: createVueDefaultContent(pascalCaseFolerName, options.folerName)
                       }
                   ]
                   // 一级目录文件
                   const wstreamArr = [
                       createFile(targetFolerPath+`/${options.main}`, mainContent),
                       createFile(targetFolerPath+`/package.json`, JSON.stringify(packageContext, '', "\t")),
                   ]
                   if(options.isCreateReadme) {
                       wstreamArr.push(createFile(targetFolerPath+`/readme.md`),)
                   }
                   // 全部文件任务
                   let allFileTasks = [...wstreamArr, ...createFolder(srcFlolerPath, srcSubFiles)]
                   // 创建文件
                   try {
                       Promise.all(allFileTasks).then(res => {
                               spinner.stop();
                               console.log(logSymbols.success, chalk.blue('创建成功'))
                       }) 
                   } catch (error) {
                       spinner.stop();
                       console.log(logSymbols.error, chalk.red('创建失败，失败原因：'+ '\n'+error))
                   }
                }
            })
        }
    })
}

/**
 * 设置组件开发模板参数
 * @param {array} promptList
 * @param {object} [config=null]
 */
function setComponentTemplate(promptList, config = null) {
    inquirer.prompt(promptList).then(options => {
        if(config) {
            createComponentTemplate({...config, ...options,})
        } else {
            createComponentTemplate(options)
        }
    }).catch(err => {
        if (err.isTtyError) {
            console.log(logSymbols.error, chalk.red('Prompt couldn\'t be rendered in the current environment'))
        } else {
            console.log(logSymbols.error, chalk.red(err))
        }
    })
}
// 初始调用
setComponentTemplate(defaulePromptList)
