export declare global{
    namespace ReactNavigation{
        interface RootParamList{
            home: undefined;
            meal: {
                name: string;
                description: string;
                hour: string;
                isOnDiet: boolean;
            };
            dietdata: undefined;
            registernewmeal: undefined;
            registermealconclusion: {isMealOnDiet : boolean};
            editmeal: {
                name: string;
                description: string;
                hour: string;
                isOnDiet: boolean;
            }
        }
    }
}