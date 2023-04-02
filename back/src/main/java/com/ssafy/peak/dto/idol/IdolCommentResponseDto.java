package com.ssafy.peak.dto.idol;

import com.ssafy.peak.dto.CommentDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdolCommentResponseDto {
    private List<CommentDto> comments;
}
