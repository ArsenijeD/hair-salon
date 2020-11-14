package com.example.hairsalon.security.configuration;

import com.example.hairsalon.model.Role;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.context.annotation.Configuration;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.expression.spel.support.StandardTypeLocator;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.core.Authentication;

@Configuration
public class MethodSecurityExpressionHandler extends DefaultMethodSecurityExpressionHandler {

    @Override
    public StandardEvaluationContext createEvaluationContextInternal(Authentication auth, MethodInvocation mi) {
        String rolePackageName = Role.class.getPackage().getName();
        StandardEvaluationContext standardEvaluationContext = super.createEvaluationContextInternal(auth, mi);
        ((StandardTypeLocator) standardEvaluationContext.getTypeLocator()).registerImport(rolePackageName);
        return standardEvaluationContext;
    }
}
