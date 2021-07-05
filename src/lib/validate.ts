import {CallbackData, ConfigOption, DataParams, SceneItem, Scenes, ValidateRules} from "./typing";
import AsyncValidator, {ErrorList} from "async-validator";
export default class BaseValidate{
    private sceneArr:SceneItem = null;

    /**
     * 规则
     */
    rules():ValidateRules{
        return{}
    }

    /**
     * 场景
     */
    scenes():Scenes{
        return {}
    }

    /**
     * 校验规则
     */
    async check(data:DataParams,scene:string|null = null,options:ConfigOption = {}):Promise<CallbackData>{
        // 开始先获取设置的场景的数据
        if (scene){
            this.setScene(scene)
        }
        // 获取校验的规则
        const rules:ValidateRules = this.createRules();
        // 拿到校验规则，实例化当前的校验规则
        const Schema = new AsyncValidator(rules);
        // 开始校验规则，返回数据格式
        try {
            await Schema.validate(data,options)
            return [null,true];
        }catch (e) {
            return [e,false];
        }
    }

    /**
     * 生成需要校验的规则
     */
    private createRules():ValidateRules{
        // 判断当前是否存在验证场景
        if (this.sceneArr&&this.sceneArr.length>0){
            const rules:ValidateRules = {};
            for (const rulesKey of this.sceneArr) {
                // 开始判断当前的规则中是否存在这个验证规则，如果存在，就验证，不存在就舍去
                if (this.rules().hasOwnProperty(rulesKey)){
                    // 存在
                    rules[rulesKey] = this.rules()[rulesKey];
                }
            }
            return rules;
        }else {
            return this.rules();
        }
    }

    /**
     * 设置场景
     */
    setScene(scene:string):BaseValidate{
        // 判断当前的场景是否存在
        if (!this.scenes().hasOwnProperty(scene)){
            // 当前的场景不存在，直接抛出一个异常
            throw new Error(`this ${scene} is not exist`);
        }
        this.sceneArr = this.scenes()[scene];
        return this;
    }
}
